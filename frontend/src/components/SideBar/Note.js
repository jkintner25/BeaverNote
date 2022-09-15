import  React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteInDB } from "../../store/notebooks";
import { addNote, removeThisNote } from "../../store/notes";
import "./sidebar.css"

function Note({ note, showDeleteBtn }) {
    // const [thisNote, setThisNote] = useState({})
    const dispatch = useDispatch();
    // const notebooks = useSelector(state => state.notebooks)
    // const currentNote = useSelector(state => state.notes)

    // useEffect(()=>{
    //     setThisNote(currentNote)
    // }, [notebooks, currentNote])

    const showNote = (note) => {
        dispatch(addNote(note))
    }

    const deleteThisNote = (id) => {
        dispatch(deleteNoteInDB(id));
        dispatch(removeThisNote(note));
    }

    return (
        <div className="sidebar-note-div">
            <li onClick={()=>showNote(note)}>{note.title}</li>
            {showDeleteBtn && <button className="delete-note" onClick={()=>deleteThisNote(note.id)}>Delete</button>}
        </div>
    );
};

export default Note;
