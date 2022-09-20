import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import styled from 'styled-components';

const LogIn = styled.p`
cursor: pointer;
`

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <LogIn onClick={() => setShowModal(true)}>Log In</LogIn>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
