import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks } from '../../store/notebooks';
import Notebook from './Notebook';
import EditNotebook from './EditNotebook';

function Sidebar() {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false)

    const userId = useSelector(state => state.session.user?.id)
    const notebooks = useSelector(state => state.notebooks && Object.values(state.notebooks))

    useEffect(()=>{
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    return (
        <div className='sidebar-container'>
            <h3>My NoteBooks</h3>
            <ul>
                {notebooks.length > 0 && !editMode && notebooks.map(notebook => (
                    <Notebook key={notebook.id} notebook={notebook} userId={userId} />
                    ))}
                {notebooks.length > 0 && editMode && notebooks.map(notebook => (
                    <EditNotebook key={notebook.id} notebook={notebook} />
                    ))}
            </ul>
            {notebooks.length > 0 && <button onClick={() => setEditMode(!editMode)}>Edit Notebooks</button>}
        </div>
    );
};

export default Sidebar;
