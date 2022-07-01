import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)}>Sign Up</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
