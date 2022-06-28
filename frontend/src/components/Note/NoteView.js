import "./Note.css"
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function NoteComponent() {
    const dispatch = useDispatch();

    return (
        <div>
            <button
            className="new-note-button"
            // onClick={}
            >Create a new note!</button>
            <div className="note-box">
                <h3 className="note-title"></h3>
                <p className="note-content"></p>
            </div>
        </div>
    )
}

export default NoteComponent;
