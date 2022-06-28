import  React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteInDB } from "../../store/notebooks";
import { addNote } from "../../store/notes";
import "./sidebar.css"

function Note({ note, showDeleteBtn }) {
    const [thisNote, setThisNote] = useState({})
    const dispatch = useDispatch();
    const notebooks = useSelector(state => state.notebooks)
    const currentNote = useSelector(state => state.notes)

    useEffect(()=>{
        setThisNote(currentNote)
    }, [notebooks, currentNote])

    const showNote = (note) => {
        dispatch(addNote(note))
    }

    const deleteThisNote = (id) => {
        dispatch(deleteNoteInDB(id));
    }

    return (
        <div className="sidebar-note-div">
            {showDeleteBtn && <button onClick={()=>deleteThisNote(note.id)}>Delete</button>}
            <li onClick={()=>showNote(note)}>{note.title}</li>
        </div>
    );
};

export default Note;
