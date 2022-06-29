import "./notebookForm.css"
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneNotebook, getAllNotebooks } from "../../store/notebooks";

function NotebookForm() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id)
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([])
    const [showForm, setShowForm] = useState(false)

    const reset = () => {
        setTitle('');
        setValidationErrors([]);
        setShowForm(false)
    }

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = []
        if (title.length < 3 || title.length > 30) errors.push('Title must be between 3-30 characters!')
        if (errors.length > 0) return setValidationErrors(errors)

        const newNotebook = {
            title: title,
            userId: userId
        };

        dispatch(addOneNotebook(newNotebook))
        .then(reset)
    }

    return (
        <div>
            <button onClick={()=>setShowForm(!showForm)}>Create a new notebook!</button>
            {showForm && <>
            {validationErrors && validationErrors.map(error=>{
                return <li key={error}>{error}</li>
            })}
            <form className="note-form" onSubmit={handleSubmit}>
                <div className="form-inner-container">
                    <input type={'text'}
                        value={title}
                        placeholder={'Notebook Title'}
                        onChange={(e) => setTitle(e.target.value)}
                        ></input>
                    <button type={'submit'}
                        disabled={!title}
                        >Save</button>
                </div>
            </form>
            </>}
        </div>
    );
}

export default NotebookForm;
