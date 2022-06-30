import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './Navigation.css';

function DemoUser() {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoLogin = () => {
        dispatch(sessionActions.login({
            credential: 'Demo-lition',
            password: 'password'
        })).then(
            (data) => {
                if (data.user)
                    return history.push('/home')
            }
        );
    };

    return (
        <button className='demo-login-button' onClick={()=>demoLogin()}>Demo</button>
    );
}

export default DemoUser;
