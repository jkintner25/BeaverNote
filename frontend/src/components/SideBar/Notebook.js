import Note from "./Note";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./sidebar.css"

function Notebook({ notebook }) {
    const dispatch = useDispatch();
    const [showNotes, setShowNotes] = useState(false);
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);

    console.log("NOTEBOOK RE-RENDERED")

    const toggleNotes = () => {
        setShowNotes(!showNotes);
    }

    useEffect(()=>{
        if(!showNotes)return;
        setShowDeleteBtn(false);
    }, [showNotes]);

    return (
        <>
            <div className="notebook-title-div">
                {showNotes && <button onClick={() => setShowDeleteBtn(!showDeleteBtn)}>Edit Notes</button>}
                <li className="notebook-title-li"
                    onClick={toggleNotes}>
                    {notebook.title}
                </li>
            </div>
            {showNotes && <ul>
                {(typeof notebook === 'object' && notebook !== null) && Object.values(notebook?.notes).map(note => {
                    return (
                        <Note key={note.id} note={note} showDeleteBtn={showDeleteBtn} />
                    )
                })}
            </ul>}
        </>
    );
};

export default Notebook;
