import "./notebookForm.css"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneNotebook, getAllNotebooks } from "../../store/notebooks";

function NotebookForm() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id)
    const [title, setTitle] = useState('');
    const [validationError, setValidationError] = useState('')
    const [showForm, setShowForm] = useState(false)

    const reset = () => {
        setTitle('');
        setValidationError('');
        setShowForm(false)
    }

    useEffect(() => {
        if (title && (title.length < 3 || title.length > 30)) {
            setValidationError('Title must be between 3-30 characters!')
        } else setValidationError('')
    }, [title])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNotebook = {
            title: title,
            userId: userId
        };

        dispatch(addOneNotebook(newNotebook)).then(() => getAllNotebooks(userId))
            .then(() => reset())
    }

    return (
        <div className="create-notebook-div">
            <button onClick={() => setShowForm(!showForm)}>Create a new notebook!</button>
            {showForm && <>
                <form className="notebook-form" onSubmit={handleSubmit}>
                {validationError && <li>{validationError}</li>}
                    <div className="form-inner-container">
                        <label>Title*</label>
                        <input type={'text'}
                            value={title}
                            placeholder={'Notebook Title'}
                            onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <button className="create-notebook-save-button" type={'submit'}
                        disabled={validationError.length > 0}
                    >Save</button>
                </form>
            </>}
        </div>
    );
}

export default NotebookForm;
