import React, { useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';

const DeleteFilesButton = ({ title = '', deleteIds, onDelete = () => {}, className = '' }) => {
    const { folder } = usePage().props;
    const deleteFilesForm = useForm({
        all: null,
        ids: deleteIds,
        parent_id: folder?.id,
    });

    useEffect(() => {
        deleteFilesForm.setData({
            all: null,
            ids: deleteIds,
            parent_id: folder?.id,
        });
    }, [deleteIds]);

    const onDeleteClick = () => {
        deleteFilesForm.delete(route('file.delete'), {
            onSuccess: () => {
                onDelete();

                showSuccessNotification('Selected files have been deleted');
            },
        });
    };

    return (
        <button
            onClick={onDeleteClick}
            className={
                className.length !== 0
                    ? className
                    : 'items-center rounded-full p-1 my-2 mr-2 hover:bg-slate-50 hover:shadow-md'
            }
            data-toggle="tooltip"
            data-placement="bottom"
            title="Move to trash"
        >
            <TrashIcon className="w-5 h-5" />
            <p className="ml-2">{title}</p>
        </button>
    );
};

export default DeleteFilesButton;
