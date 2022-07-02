import ProfileButton from "./ProfileButton";
import './Navigation.css';


function LoggedInNav({ sessionUser }) {

    return (
        <div className='logged-in-nav nav'>
            <h1 className='beavernote'>Beavernote</h1>
            <ProfileButton user={sessionUser} />
        </div>
    )
}

export default LoggedInNav;
