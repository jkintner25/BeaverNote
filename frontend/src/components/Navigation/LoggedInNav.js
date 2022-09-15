import ProfileButton from "./ProfileButton";
import './Navigation.css';
import NotebookForm from "../NotebookForm/NotebookForm";
import NoteForm from "../Note/NoteForm";


function LoggedInNav({ sessionUser }) {

    return (
        <div className='logged-in-nav nav'>
            <h1 className='beavernote'>Beavernote</h1>
            <div className="right">
            <NotebookForm />
            <NoteForm />
            <ProfileButton user={sessionUser} />
            </div>
        </div>
    )
}

export default LoggedInNav;
