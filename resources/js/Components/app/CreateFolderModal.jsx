import React, { useRef } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

const CreateFolderModal = ({ show = false, onClose = () => {} }) => {
    const { folder } = usePage().props;

    const form = useForm({
        name: '',
        parent_id: folder?.id,
    });

    const folderNameInput = useRef(null);

    const createFolder = () => {
        form.post(route('folder.create'), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                form.reset();
            },
            onError: () => folderNameInput.current.focus(),
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
                <h2 className="text-lg font-medium text-gray-900">Create New Folder</h2>

                <div className="mt-6">
                    <InputLabel htmlFor="folderName" value="Folder Name" className="sr-only" />
                    <TextInput
                        ref={folderNameInput}
                        type="text"
                        id="folderName"
                        className={`mt-1 block w-full ${
                            form.errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                        }`}
                        onChange={(e) => form.setData('name', e.target.value)}
                        placeholder="Folder Name"
                        onKeyUp={(e) => e.key === 'Enter' && createFolder()}
                    />

                    <InputError message={form.errors.name} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    <PrimaryButton
                        className={`ml-3 ${form.processing && 'opacity-25'}`}
                        onClick={createFolder}
                        disabled={form.processing}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default CreateFolderModal;
