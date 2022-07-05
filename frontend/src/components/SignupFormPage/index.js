import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([])

    useEffect(() => {
        let valErrs = []
        if (!email)
            valErrs.push('Email field required.')
        if (!username)
            valErrs.push('Username field required.')
        if (!password)
            valErrs.push('Password field required.')
        if (password !== confirmPassword)
            valErrs.push('Password fields must match.')
        setValidationErrors(valErrs)
    }, [email, username, password, confirmPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setValidationErrors([])
            setErrors([]);
            dispatch(sessionActions.signup({ email, username, password }))
                .then(history.push('/'))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                {validationErrors && validationErrors.map(err=><li key={err}>{err}</li>)}
            </ul>
            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button
            disabled={validationErrors.length > 0}
            type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;
