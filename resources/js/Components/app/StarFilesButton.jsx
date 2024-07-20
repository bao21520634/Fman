import React, { useEffect } from 'react';
import { StarIcon as SolidStarIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { useForm, usePage } from '@inertiajs/react';

const StarFilesButton = ({ title = '', selectedIds, isAllStarred = false, onStar = () => {}, className = '' }) => {
    const { folder } = usePage().props;
    const form = useForm({
        all: null,
        ids: selectedIds,
        parent_id: folder?.id,
        remove: isAllStarred,
    });

    useEffect(() => {
        form.setData({
            all: null,
            ids: selectedIds,
            parent_id: folder?.id,
            remove: isAllStarred,
        });
    }, [selectedIds]);

    const onStarClick = () => {
        form.post(route('file.star'), {
            onSuccess: () => {
                onStar();
            },
        });
    };

    return (
        <>
            {isAllStarred ? (
                <button
                    onClick={onStarClick}
                    className={className || 'items-center rounded-full p-1 my-2 mr-2 hover:bg-slate-50 hover:shadow-md'}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Remove from Starred"
                >
                    <SolidStarIcon className="w-5 h-5" />
                    <p className="ml-2">{title}</p>
                </button>
            ) : (
                <button
                    onClick={onStarClick}
                    className={className || 'items-center rounded-full p-1 my-2 mr-2 hover:bg-slate-50 hover:shadow-md'}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Add to Starred"
                >
                    <StarIcon className="w-5 h-5" />
                    <p className="ml-2">{title}</p>
                </button>
            )}
        </>
    );
};

export default StarFilesButton;
