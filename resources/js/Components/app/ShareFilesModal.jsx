import React, { useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';

const ShareFilesModal = ({ show = false, selectedIds, onClose = () => {} }) => {
    const { folder } = usePage().props;

    const form = useForm({
        email: null,
        ids: selectedIds,
        parent_id: folder?.id,
    });

    const emailInput = useRef(null);

    useEffect(() => {
        form.setData({
            email: null,
            ids: selectedIds,
            parent_id: folder?.id,
        });
    }, [selectedIds]);

    const share = () => {
        form.post(route('file.share'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();

                showSuccessNotification(`Selected files will be shared to ${form.data.email}`);
                form.reset();
            },
            onError: () => emailInput.current.focus(),
        });
    };

    const closeModal = () => {
        form.clearErrors();
        form.reset();
        onClose();
    };

    return (
        <Modal show={show} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Share Files</h2>

                <div className="mt-6">
                    <InputLabel htmlFor="shareEmail" value="Enter Email Address" className="sr-only" />
                    <TextInput
                        ref={emailInput}
                        type="text"
                        id="shareEmail"
                        className={`mt-1 block w-full ${
                            form.errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        onChange={(e) => form.setData('email', e.target.value)}
                        placeholder="Enter Email Address"
                        onKeyUp={(e) => e.key === 'Enter' && share()}
                    />

                    <InputError message={form.errors.email} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton
                        className={`ml-3 ${form.processing && 'opacity-25'}`}
                        onClick={share}
                        disabled={form.processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default ShareFilesModal;
