import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { getAllNotebooks } from "../../store/notebooks";
import { updateNote } from "../../store/notes";
import "./quill.css"

function QuillComponent({ note, setEdit }) {
    const dispatch = useDispatch();
    const userId = useSelector(state=>state.session.user.id)
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.content);
    const [editTitle, setEditTitle] = useState(false)
    const [validationErrors, setValidationErrors] = useState(null)

    useEffect(() => {
        let errors = []
        if (!body) return;
        if (title.length < 3 || title.length > 30) errors.push('Title must be between 3-30 characters!')
        if (body.length < 2) errors.push('You need more than one character to save this note!')
        if (errors.length > 0) setValidationErrors(errors)
        if (errors.length === 0) setValidationErrors(null)
    }, [title, body])

    const handleBody = e => {
        setBody(e);
    }

    function handleSubmit() {
        const id = note.id

        const updatedNote = {
            title: title,
            content: body,
            userId: userId,
            notebookId: note.notebookId
        }

        dispatch(updateNote(id, updatedNote))
            .then(() => dispatch(getAllNotebooks(userId)))

        setEdit(false)
    }

    function updateTitle() {
        const id = note.id

        const updatedNote = {
            title: title,
            content: body,
            userId: userId,
            notebookId: note.notebookId
        }

        dispatch(updateNote(id, updatedNote))
            .then(() => dispatch(getAllNotebooks(userId)))

        setEdit(true)
    }

    return (
        <div className="outer-div">
            {!editTitle ?
                <>
                    <h1>{note.title}</h1>
                    <div>
                    <button type="button" onClick={() => setEditTitle(true)}>Edit Title</button>
                    </div>
                </>
                :
                <>
                {validationErrors && validationErrors.map((e, i)=>{
                    return <li key={i} className='errors'>{e}</li>
                })}
                    <input className="edit-title-input" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                    <button disabled={validationErrors} onClick={updateTitle}>Save</button>
                    <button type="button" onClick={() => setEditTitle(false)}>Cancel</button>
                </>
            }
                <ReactQuill
                    placeholder="Write a note!"
                    onChange={handleBody}
                    value={body}
                />
            <div>
            <button type='button' className="editor-buttons" onClick={() => setEdit(false)}>Cancel</button>
            <button type='button' className="editor-buttons" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default QuillComponent
