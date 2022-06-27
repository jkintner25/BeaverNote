import Note from "./Note";
import { useState } from 'react';

function Notebook({ notebook }) {
    const [showNotes, setShowNotes] = useState(false)

    const toggleNotes = () => {
        setShowNotes(!showNotes)
    }

    return (
        <>
            <li name={notebook.title}
                onClick={toggleNotes}>
                {notebook.title}
            </li>
            <ul>
                {showNotes && Object.values(notebook.notes).map(note => {
                    return (
                        <Note key={note.id} note={note} />
                    )
                })}
            </ul>
        </>
    );
};

export default Notebook;
