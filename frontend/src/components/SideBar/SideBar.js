import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks } from '../../store/notebooks';
import Notebook from './Notebook';


function Sidebar() {
    const dispatch = useDispatch();
    const [notebooks, setNotebooks] = useState([])
    const userId = useSelector(state => state.session?.user?.id)

    useEffect(() => {
        if(!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    return (
        <div>
            <h3>My NoteBooks</h3>
            <ul>
                {}
                <li>
                    <Notebook />
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
