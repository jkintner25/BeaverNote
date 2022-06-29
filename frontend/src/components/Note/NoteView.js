import "./Note.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../../store/notes";
import { getAllNotebooks } from "../../store/notebooks";

function NoteView() {
    const dispatch = useDispatch();
    const thisNote = useSelector(state => state.notes && state.notes)
    const userId = useSelector(state => state.session && state.session.user.id)

    const [viewNote, setViewNote] = useState(true)
    const [editNote, setEditNote] = useState(false)
    const [title, setTitle] = useState(thisNote ? thisNote.title : '')
    const [content, setContent] = useState(thisNote ? thisNote.content : '')

    useEffect(()=>{
        setTitle(thisNote.title);
        setContent(thisNote.content);
        setViewNote(true);
        setEditNote(false);
    }, [thisNote])

    useEffect(()=>{
        if(!editNote) return;
        setViewNote(false)
    }, [editNote])

    useEffect(()=>{
        if(!viewNote) return;
        setEditNote(false)
    }, [viewNote])

    const cancelEdit = () => {
        setViewNote(true);
    }

    const updateThisNote = () => {

        const id = thisNote.id

        const updatedNote = {
            title: title,
            content: content,
            userId: userId,
            notebookId: thisNote.notebookId
        }

        dispatch(updateNote(id, updatedNote))
        .then(()=>dispatch(getAllNotebooks(userId)))

        setViewNote(true)
    }

    return (
        <div>
            {thisNote ?
            <div className="note-box">

                {thisNote && viewNote && <h3
                className="note-title"
                onClick={()=>setEditNote(true)}
                >{thisNote.title}</h3>}

                {thisNote && editNote && <input
                className="input-title"
                placeholder={thisNote.title}
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />}

                {thisNote && viewNote && <p
                className="note-content"
                onClick={()=>setEditNote(true)}
                >{thisNote.content}</p>}

                {thisNote && editNote && <input
                className="input-content"
                placeholder={thisNote.content}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                />}

                {thisNote && editNote && <button
                onClick={()=>cancelEdit()}
                >Cancel</button>}

                {thisNote && editNote && <button
                onClick={()=>updateThisNote()}
                >Save</button>}

            </div> :
            <p>Loading</p>
            }
        </div>
    )
}

export default NoteView;
