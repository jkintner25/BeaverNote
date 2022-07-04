import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { ReactComponent as Otter } from "../../images/otter.svg"
import './Navigation.css';
import { clearState } from "../../store/notebooks";
import { clearNoteState } from "../../store/notes";

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(clearState());
        dispatch(clearNoteState());
        dispatch(sessionActions.logout())
            .then(() => history.push('/'))
    };

    return (
        <>


            <div className="profile-button" onClick={openMenu}>
                <p className="profile-menu-text">Profile Menu</p>
                <Otter className='otter' />
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    <p className="dropdown-li">{user.username}</p>
                    <p className="dropdown-li">{user.email}</p>
                    <button className="logout-button" onClick={logout}>Log Out</button>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
