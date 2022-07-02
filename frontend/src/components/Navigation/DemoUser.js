import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
                    return history.push('/')
            }
        );
    };

    return (
        <p className='demo-login-button' onClick={demoLogin}>Demo</p>
    );
}

export default DemoUser;
