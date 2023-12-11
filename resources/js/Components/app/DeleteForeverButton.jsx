import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import ConfirmationDialog from '@/Components/ConfirmationDialog';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';

const DeleteForeverButton = ({ title = '', deleteIds, onDelete = () => {}, className = '' }) => {
    const { folder } = usePage().props;
    const deleteFilesForm = useForm({
        all: null,
        ids: deleteIds,
        parent_id: folder?.id,
    });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        deleteFilesForm.setData({
            all: null,
            ids: deleteIds,
            parent_id: folder?.id,
        });
    }, [deleteIds]);

    const onDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const onDeleteCancel = () => {
        setShowDeleteDialog(false);
    };

    const onDeleteConfirm = () => {
        deleteFilesForm.delete(route('file.deleteForever'), {
            onSuccess: () => {
                setShowDeleteDialog(false);
                onDelete();

                showSuccessNotification('Selected files have been deleted forever');
            },
        });
    };

    return (
        <>
            <button
                onClick={onDeleteClick}
                className={className || 'items-center rounded-full p-1 my-2 ml-2 hover:bg-slate-50 hover:shadow-md'}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Delete forever"
            >
                <TrashIcon className="w-5 h-5" />
                <p className="ml-2">{title}</p>
            </button>

            <ConfirmationDialog
                show={showDeleteDialog}
                message="Are you sure you want to permanently delete these files?"
                onCancel={onDeleteCancel}
                onConfirm={onDeleteConfirm}
            />
        </>
    );
};

export default DeleteForeverButton;
