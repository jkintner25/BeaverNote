import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { ReactComponent as Otter } from "../../images/otter.svg"


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
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <>
            <div className="profile-button" onClick={openMenu}>
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
