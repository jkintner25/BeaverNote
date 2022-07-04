import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./loginForm.css";

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        let valErrs = []
        if (!credential)
            valErrs.push('Usernamer/email field cannot be empty.')
        if (!password)
            valErrs.push('Password field cannot be empty.')
        setValidationErrors(valErrs)
    }, [credential, password])

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationErrors([])
        setErrors([]);
        dispatch(sessionActions.login({ credential, password })).then(
            (data) => {
                if (data.user)
                return history.push('/')
            }
        ).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
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

export default LoginForm;
