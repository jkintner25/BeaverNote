import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import "./quill.css"

function QuillComponent() {
    const [body, setBody] = useState('');

    const handleBody = e => {
        setBody(e);
    }

    return (
        <div className="quill-container">
            <ReactQuill
                placeholder="Write a note!"
                onChange={handleBody}
                value={body}
            />
        </div>
    );
};

export default QuillComponent
