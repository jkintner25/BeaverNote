import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])

    // if (sessionUser) return (
    //     <Redirect to="/" />
    // );

    useEffect(() => {
        console.log(credential, validationErrors)
        let valErrs = []
        if (!credential)
            valErrs.push('Usernamer/email field cannot be empty.')
        if (!password)
            valErrs.push('Password field cannot be empty.')
        setValidationErrors(valErrs)
    }, [credential, password])


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                {validationErrors && validationErrors.map(err => <li key={err.length}>{err}</li>)}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button
                disabled={validationErrors.length > 0}
                type="submit">Log In</button>
        </form>
    );
}

export default LoginFormPage;
