import React, { useEffect, useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { useForm, usePage } from '@inertiajs/react';
import { showSuccessNotification } from '@/event-bus';
import ShareFilesModal from './ShareFilesModal';

const ShareFilesButton = ({ title = '', selectedIds, onShare = () => {}, className = '' }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <button
                onClick={() => {
                    setIsShow(true);
                    onShare();
                }}
                className={className || 'items-center rounded-full p-1 my-2 mr-2 hover:bg-slate-50 hover:shadow-md'}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Share"
            >
                <ShareIcon className="w-5 h-5" />
                <p className="ml-2">{title}</p>
            </button>

            <ShareFilesModal show={isShow} selectedIds={selectedIds} onClose={() => setIsShow(false)} />
        </>
    );
};

export default ShareFilesButton;
