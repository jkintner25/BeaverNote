import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import './Navigation.css';
import styled from 'styled-components';

const Demo = styled.p`
cursor: pointer;
`

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
        <Demo className='demo-login-button' onClick={demoLogin}>Demo</Demo>
    );
}

export default DemoUser;
