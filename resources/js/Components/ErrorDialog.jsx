import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { SHOW_ERROR_DIALOG, emitter } from '@/event-bus';

const ErrorDialog = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        emitter.on(SHOW_ERROR_DIALOG, ({ message: msg }) => {
            setShow(true);
            setMessage(msg);
        });
    });

    const close = () => {
        setShow(false);
        setMessage('');
    };

    return (
        <div>
            <Modal show={show} maxWidth="md">
                <div className="p-6">
                    <h2 className="text-2xl mb-2 text-red-600 font-semibold">Error</h2>
                    <p>{message}</p>
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton onClick={close}>OK</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ErrorDialog;
