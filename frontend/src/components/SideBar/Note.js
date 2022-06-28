import  React, { useState } from "react";
import "./sidebar.css"

function Note({ note, showDeleteBtn }) {
    
    const deleteNote = () => {

    }

    return (
        <div className="sidebar-note-div">
            {showDeleteBtn && <button onClick={deleteNote}>Delete</button>}
            <li>{note.title}</li>
        </div>
    );
};

export default Note;
