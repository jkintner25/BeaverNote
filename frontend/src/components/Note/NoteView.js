import "./Note.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../store/notes";
import { getAllNotebooks } from "../../store/notebooks";

function NoteView() {
    const dispatch = useDispatch();
    const thisNote = useSelector(state => state.notes && state.notes)
    const userId = useSelector(state => state.session && state.session.user.id)

    const [viewNote, setViewNote] = useState(true)
    const [editNote, setEditNote] = useState(false)
    const [title, setTitle] = useState(thisNote ? thisNote.title : '')
    const [content, setContent] = useState(thisNote ? thisNote.content : '')
    const [validationErrors, setValidationErrors] = useState(null)

    useEffect(() => {
        let errors = []
        if (!thisNote || !title) return;
        if (title.length < 3 || title.length > 30) errors.push('Title must be between 3-30 characters!')
        if (content.length < 2) errors.push('You need more than one character to save this note!')
        if (errors.length > 0) setValidationErrors(errors)
        if (errors.length === 0) setValidationErrors(null)
    }, [title, content])

    useEffect(() => {
        setTitle(thisNote.title);
        setContent(thisNote.content);
        setViewNote(true);
        setEditNote(false);
    }, [thisNote])

    useEffect(() => {
        if (!editNote) return;
        setViewNote(false)
    }, [editNote])

    useEffect(() => {
        if (!viewNote) return;
        setEditNote(false)
    }, [viewNote])

    const cancelEdit = () => {
        setViewNote(true);
    }

    const updateThisNote = () => {

        const id = thisNote.id

        const updatedNote = {
            title: title,
            content: content,
            userId: userId,
            notebookId: thisNote.notebookId
        }

        dispatch(updateNote(id, updatedNote))
            .then(() => dispatch(getAllNotebooks(userId)))

        setViewNote(true)
    }

    return (
        <div className="note-view">

            {validationErrors && <ul>
                {validationErrors.map(error => <li className="val-error" key={error.length}>{error}</li>)}
            </ul>}

            {(thisNote.id) ?
                <div className="note-box">

                    {thisNote && viewNote && <h3
                        className="note-title tooltip"
                        onClick={() => setEditNote(true)}
                        data-text='Click to edit!'
                    >{thisNote.title}</h3>}

                    {thisNote && editNote && <input
                        className="input-title"
                        placeholder={thisNote.title}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />}

                    {thisNote && viewNote && <p
                        className="note-content tooltip"
                        onClick={() => setEditNote(true)}
                        data-text='Click to edit!'
                    >{thisNote.content}</p>}

                    {thisNote && editNote && <textarea
                        className="input-content"
                        placeholder={thisNote.content}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}>
                    </textarea>}

                    {thisNote && editNote && <button
                        className="cancel-button"
                        onClick={() => cancelEdit()}
                    >Cancel</button>}

                    {thisNote && editNote && <button
                        disabled={validationErrors}
                        className="save-button"
                        onClick={() => updateThisNote()}
                    >Save</button>}

                </div> :
                <div className="select-note-box">
                    <p className="select-note">Select a note!</p>
                </div>
            }
        </div>
    )
}

export default NoteView;
