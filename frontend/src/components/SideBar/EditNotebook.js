import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteNotebook, editNotebook } from '../../store/notebooks';
import { removeThisNote } from '../../store/notes';
import "./sidebar.css"

function EditNotebook({ notebook, userId }) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(notebook.title);
    const [validationErrors, setValidationErrors] = useState('');

    const thisNote = useSelector(state => state.notes && state.notes);

    useEffect(()=>{
        if(title.length > 2 && title.length < 31) {
            setValidationErrors('');
            return;
        };
        setValidationErrors('Title must be between 3-30 characters!');
    }, [title, validationErrors])

    const toggleMode = () => {
        setEditMode(!editMode);
        setTitle(notebook.title);
    }

    const saveNotebookTitle = () => {
        const updatedNotebook = {
            id: notebook.id,
            title: title,
            userId: userId
        };

        dispatch(editNotebook(notebook.id, updatedNotebook))
            .then(() => toggleMode());

    }

    const deleteThisNotebook = () => {
        const id = notebook.id;
        dispatch(deleteNotebook(id)).then(() => dispatch(removeThisNote(thisNote)))
    }

    return (
        <>
            <div className="notebook-title-div">
                {!editMode && <button onClick={() => toggleMode()}>Edit</button>}
                {!editMode > 0 &&
                    <li className="notebook-title-li">
                        {notebook.title}
                    </li>
                }
                {editMode &&
                    <div className='edit-notebook-div'>
                        {validationErrors && <div>{validationErrors}</div>}
                        <input className='edit-notebook-input'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <button onClick={() => toggleMode()}>Cancel</button>
                        <button disabled={validationErrors} onClick={() => saveNotebookTitle()}>Save</button>
                        <button onClick={() => deleteThisNotebook()}>Delete</button>
                    </div>}
            </div>
        </>
    );
};

export default EditNotebook;
