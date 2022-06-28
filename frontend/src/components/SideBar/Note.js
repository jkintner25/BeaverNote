import  React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteInDB } from "../../store/notebooks";
import "./sidebar.css"

function Note({ note, showDeleteBtn }) {
    const dispatch = useDispatch();

    const notebooks = useSelector(state=> state.notebooks)

    useEffect(()=>{
    }, [notebooks])

    const deleteThisNote = (id) => {
        dispatch(deleteNoteInDB(id));
    }

    return (
        <div className="sidebar-note-div">
            {showDeleteBtn && <button onClick={()=>deleteThisNote(note.id)}>Delete</button>}
            <li>{note.title}</li>
        </div>
    );
};

export default Note;
