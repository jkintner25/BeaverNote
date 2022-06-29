import Note from "./Note";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./sidebar.css"

function Notebook({ notebook }) {
    const [showNotes, setShowNotes] = useState(false)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)

    const notebooksStore = useSelector(state=>state.notebooks)

    const toggleNotes = () => {
        setShowNotes(!showNotes)
    }

    useEffect(()=>{
    }, [notebooksStore])

    useEffect(()=>{
        if(!showNotes)return;
        setShowDeleteBtn(false)
    }, [showNotes])

    return (
        <>
            <div className="notebook-title-div">
                {showNotes && <button onClick={() => setShowDeleteBtn(!showDeleteBtn)}>Edit Notes</button>}
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
