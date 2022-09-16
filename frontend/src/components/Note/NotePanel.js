import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuillComponent from "../Quill/Quill";

function NotePanel() {
    const thisNote = useSelector(state => state.notes && state.notes)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!Object.entries(thisNote).length) return;
        else {
            setTitle(thisNote.title)
            setContent(thisNote.content)
        }
    }, [thisNote])

    useEffect(() => {
        setEdit(false)
    }, [thisNote])

    console.log(content)

    return (
        <>
            {!edit ?
                <>
                    {Object.entries(thisNote).length ?
                        <>
                            <h1>{title}</h1>
                            <div className="note-body" dangerouslySetInnerHTML={{ __html: content }}></div>
                            <button type="button" onClick={() => setEdit(true)}>Edit</button>
                        </>
                        :
                        <p>Select a note.</p>
                    }
                </>
                : <>
                    <QuillComponent note={thisNote} setEdit={setEdit} />
                </>
            }
        </>
    );
};

export default NotePanel;
