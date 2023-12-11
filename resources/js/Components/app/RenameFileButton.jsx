import React, { useEffect, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';
import RenameFileModal from './RenameFileModal';

const RenameFileButton = ({ title = '', id, onRename = () => {}, className = '' }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <button
                onClick={() => {
                    setIsShow(true);
                    onRename();
                }}
                className={className || 'items-center rounded-full p-1 my-2 ml-2 hover:bg-slate-50 hover:shadow-md'}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Rename"
            >
                <PencilSquareIcon className="w-5 h-5" />
                <p className="ml-2">{title}</p>
            </button>

            <RenameFileModal show={isShow} id={id} onClose={() => setIsShow(false)} />
        </>
    );
};

export default RenameFileButton;
