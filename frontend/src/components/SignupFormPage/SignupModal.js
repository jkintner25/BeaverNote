import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';
import styled from 'styled-components';

const SignUp = styled.p`
cursor: pointer;
`

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <SignUp onClick={() => setShowModal(true)}>Sign Up</SignUp>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
