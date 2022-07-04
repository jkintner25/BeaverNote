import "./Note.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNoteToNotebook, getAllNotebooks } from "../../store/notebooks";
import { createNote } from "../../store/notes";

function NoteForm() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id)
    const userNotebooks = useSelector(state => state.notebooks && Object.values(state.notebooks))
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [validationErrors, setValidationErrors] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!userNotebooks[0] || !(selectedNotebook === null)) return;
        setSelectedNotebook(Number(userNotebooks[0].id))
    }, [userNotebooks, selectedNotebook])

    const reset = () => {
        setTitle('');
        setContent('');
        setSelectedNotebook(null);
        setValidationErrors(null);
        setShowForm(false)
    }

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    useEffect(() => {
        let errors = []
        if (title && (title.length < 3 || title.length > 30)) errors.push('Title must be between 3-30 characters!')
        if (content.length === 1) errors.push('You need more than one character to save this note!')
        if (!selectedNotebook) errors.push('Select a notebook!')
        if (errors.length > 0)setValidationErrors(errors)
        if (errors.length === 0) setValidationErrors(null)
    }, [title, content, selectedNotebook])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
            title: title,
            content: content,
            userId: userId,
            notebookId: selectedNotebook
        };

        dispatch(createNote(newNote)).then((note) => {
            dispatch(addNoteToNotebook(note))
        })
            .then(reset)
    }

    return (
        <div className="create-note-div">
            <button className="create-note-button" onClick={() => setShowForm(!showForm)}>Create a new note!</button>
            {showForm && <>
                {validationErrors && validationErrors.map(error => {
                    return <li key={error}>{error}</li>
                })}
                <form className="note-form" onSubmit={handleSubmit}>
                    <div className="note-form-inner-container">
                        <label>Title</label>
                        <input className="title-input" type={'text'}
                            value={title}
                            placeholder={'Note Title'}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        <label>Content</label>
                        <textarea className="content-input" type={'text'}
                            value={content}
                            placeholder={'Note Content'}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <label>Notebooks:</label>
                        <select className="notebook-selector"
                            onChange={(e) => setSelectedNotebook(e.target.value)}>
                            {userNotebooks && userNotebooks.map(notebook => {
                                return <option
                                    key={notebook.id}
                                    name={notebook.title}
                                    value={Number(notebook.id)}
                                >{notebook.title}</option>
                            })}
                        </select>
                    </div>
                    <button type={'submit'}
                        disabled={!title || !content}
                    >Save this note</button>
                </form>
            </>}
        </div>
    );
}

export default NoteForm;
