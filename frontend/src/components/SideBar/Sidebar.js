import React, { useEffect, useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotebooks } from '../../store/notebooks';
import Notebook from './Notebook';

// export const SidebarContext = createContext()

// export const SidebarProvider = (props) => {
//     const [tripwire, setTripwire] = useState(false)

//     return (
//         <SidebarContext.Provider value={{tripwire, setTripwire}}>
//             {props.children}
//         </SidebarContext.Provider>
//     );
// }

function Sidebar() {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.session?.user?.id)
    const notebooks = useSelector(state => state.notebooks && Object.values(state.notebooks))

    useEffect(() => {
        if (!userId) return;
        dispatch(getAllNotebooks(userId))
        console.log(notebooks)
    }, [dispatch, userId, notebooks])

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
