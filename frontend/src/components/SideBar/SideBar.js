import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks } from '../../store/notebooks';
import Notebook from './Notebook';


function Sidebar() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session?.user?.id)
    const notebooks = useSelector(state => state.notebooks)

    console.log(notebooks)

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    useEffect(() => {

    })

    return (
        <div>
            <h3>My NoteBooks</h3>
            <ul>
                { }
                <li>
                    <Notebook />
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
