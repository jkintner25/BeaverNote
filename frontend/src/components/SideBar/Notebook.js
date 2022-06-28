import Note from "./Note";
import React, { useState, useEffect } from 'react';
import "./sidebar.css"

function Notebook({ notebook }) {
    const [showNotes, setShowNotes] = useState(false)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    const toggleNotes = () => {
        setShowNotes(!showNotes)
    }

    useEffect(()=>{
        if(!showNotes)return;
        setShowDeleteBtn(false)
    }, [showNotes])

    return (
        <>
            <div className="notebook-title-div">
                {showNotes && <button onClick={() => setShowDeleteBtn(!showDeleteBtn)}>Edit</button>}
                <li className="notebook-title-li"
                    onClick={toggleNotes}>
                    {notebook.title}
                </li>
            </div>
            <ul>
                {showNotes && Object.values(notebook.notes).map(note => {
                    return (
                        <Note key={note.id} note={note} showDeleteBtn={showDeleteBtn} />
                    )
                })}
            </ul>
        </>
    );
};

export default Notebook;
