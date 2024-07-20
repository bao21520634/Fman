import React, { useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';

const RenameFileModal = ({ show = false, id, onClose = () => {} }) => {
    const form = useForm({
        id: id,
        name: '',
    });

    const nameInput = useRef(null);

    useEffect(() => {
        console.log('change');

        form.setData({
            id: id,
            name: '',
        });
    }, [id]);

    const rename = () => {
        form.post(route('file.rename'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();

                showSuccessNotification(`File renamed to "${form.data.name}"`);
                form.reset();
            },
            onError: () => nameInput.current.focus(),
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
                <h2 className="text-lg font-medium text-gray-900">Rename</h2>

                <div className="mt-6">
                    <InputLabel htmlFor="rename" value="Rename" className="sr-only" />
                    <TextInput
                        ref={nameInput}
                        type="text"
                        id="rename"
                        className={`mt-1 block w-full ${
                            form.errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        onChange={(e) => form.setData('name', e.target.value)}
                        placeholder="Enter name"
                        onKeyUp={(e) => e.key === 'Enter' && rename()}
                    />

                    <InputError message={form.errors.name} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton
                        className={`ml-3 ${form.processing && 'opacity-25'}`}
                        onClick={rename}
                        disabled={form.processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default RenameFileModal;
