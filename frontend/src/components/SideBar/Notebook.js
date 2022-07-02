import Note from "./Note";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./sidebar.css"

function Notebook({ notebook, showDeleteBtn, setShowDeleteBtn }) {
    const [showNotes, setShowNotes] = useState(false);

    const notebooks = useSelector(state => state.notebooks && state.notebooks)

    const toggleNotes = () => {
        setShowNotes(!showNotes);
    }

    useEffect(() => {
        if (!showNotes) return;
        setShowDeleteBtn(false);
    }, [showNotes]);

    return (
        <>
            <div className="notebook-title-div">
                <li className="notebook-title-li"
                    onClick={toggleNotes}>
                    {notebook.title}
                </li>
            </div>
            {showNotes && <ul>
                {notebooks[notebook.id].notes && Object.values(notebooks[notebook.id].notes).map(note => {
                    return (
                        <Note key={note.id} note={note} showDeleteBtn={showDeleteBtn} />
                    )
                })}
            </ul>}
        </>
    );
};

export default Notebook;
