import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks } from '../../store/notebooks';
import Notebook from './Notebook';


function Sidebar() {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session?.user?.id)
    const notebooks = useSelector(state => state.notebooks && Object.values(state.notebooks))

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
    }, [dispatch, userId])

    useEffect(()=>{
    }, [notebooks])

    return (
        <div>
            <h3>My NoteBooks</h3>
            <ul>
                {notebooks?.length > 0 && notebooks.map(notebook => (
                    <Notebook key={notebook.id} notebook={notebook} />
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
