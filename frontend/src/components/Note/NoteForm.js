import "./Note.css"
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNote, getAllNotebooks } from "../../store/notebooks";
import { createNote } from "../../store/notes";

function NoteForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session?.user?.id)
    const userNotebooks = useSelector(state => state.notebooks && Object.values(state?.notebooks))
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(()=>{
        if(!userNotebooks[0] || !(selectedNotebook === null))return;
        setSelectedNotebook(Number(userNotebooks[0].id))
    }, [userNotebooks])

    const reset = () => {
        setTitle('');
        setContent('');
        setSelectedNotebook(null);
        setValidationErrors([]);
    }

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = []
        if (title.length < 3) errors.push('You need a title!')
        if (!content) errors.push('You need content to save this note!')
        if (!selectedNotebook) errors.push('Select a notebook!')
        if (errors.length > 0) return setValidationErrors(errors)

        const newNote = {
            title: title,
            content: content,
            userId: userId,
            notebookId: selectedNotebook
        };

        dispatch(createNote(newNote)).then((note)=>dispatch(addNote(note))).then(reset)
    }

    return (
        <div>
            {validationErrors && validationErrors.map(error=>{
                return <li key={error}>{error}</li>
            })}
            <form className="note-form" onSubmit={handleSubmit}>
                <div className="form-inner-container">
                    <input type={'text'}
                        value={title}
                        placeholder={'Note Title'}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input type={'text'}
                        value={content}
                        placeholder={'Note Content'}
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                    <select className="notebook-selector"
                    onChange={(e)=>setSelectedNotebook(e.target.value)}>
                        {userNotebooks && userNotebooks.map(notebook=>{
                            return <option
                            key={notebook.id}
                            name={notebook.title}
                            value={Number(notebook.id)}
                            >{notebook.title}</option>
                        })}
                    </select>
                    <button type={'submit'}
                        disabled={!title || !content}
                    >Save this note</button>
                </div>
            </form>
        </div>
    );
}

export default NoteForm;
