import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNotebook } from '../../store/notebooks';
import "./sidebar.css"

function EditNotebook({ notebook, userId }) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(notebook.title);

    const toggleMode = () => {
        setEditMode(!editMode)
    }

    const saveNotebookTitle = () => {
        const updatedNotebook = {
            id: notebook.id,
            title: title,
            userId: userId
        };

        dispatch(editNotebook(notebook.id, updatedNotebook))
        .then(()=>toggleMode());

    }

    const deleteThisNotebook = () => {
        
    }

    return (
        <>
            <div className="notebook-title-div">
                {!editMode && <button onClick={() => toggleMode()}>Edit</button>}
                {editMode && <button onClick={() => toggleMode()}>Cancel</button>}
                {!editMode > 0 &&
                        <li className="notebook-title-li">
                            {notebook.title}
                        </li>
                    }
                {editMode &&
                    <div className='edit-notebook-div'>
                            <input className='edit-notebook-input'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        <button onClick={() => saveNotebookTitle()}>Save</button>
                        <button>Delete</button>
                    </div>}
            </div>
        </>
    );
};

export default EditNotebook;
