import React from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

const ConfirmationDialog = ({ show = false, message = '', onCancel = () => {}, onConfirm = () => {} }) => {
    return (
        <Modal show={show} maxWidth="md">
            <div className="p-6 select-none">
                <h2 className="text-2xl mb-2 font-semibold">Confirm</h2>
                <p>{message}</p>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onCancel}>No</SecondaryButton>

                    <DangerButton className="ml-3" onClick={onConfirm}>
                        Yes
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationDialog;
