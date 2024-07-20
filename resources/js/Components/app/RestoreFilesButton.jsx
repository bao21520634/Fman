import React, { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';

const RestoreFilesButton = ({ title = '', selectedIds, onRestore = () => {}, className = '' }) => {
    const { folder } = usePage().props;
    const form = useForm({
        all: null,
        ids: selectedIds,
        parent_id: folder?.id,
    });

    useEffect(() => {
        form.setData({
            all: null,
            ids: selectedIds,
            parent_id: folder?.id,
        });
    }, [selectedIds]);

    const onRestoreClick = () => {
        form.post(route('file.restore'), {
            onSuccess: () => {
                onRestore();

                showSuccessNotification('Selected files have been restored');
            },
        });
    };

    return (
        <button
            onClick={onRestoreClick}
            className={className || 'items-center rounded-full p-1 my-2 ml-2 hover:bg-slate-50 hover:shadow-md'}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Restore"
        >
            <ArrowPathIcon className="w-5 h-5" />
            <p className="ml-2">{title}</p>
        </button>
    );
};

export default RestoreFilesButton;
