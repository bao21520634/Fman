import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { usePage } from '@inertiajs/react';
import { httpGet } from '@/Helper/http-helper';

const DownloadFilesButton = ({
    title = '',
    ids,
    sharedWithMe = false,
    sharedByMe = false,
    className = '',
    onDownload = () => {},
}) => {
    const { folder } = usePage().props;

    const download = () => {
        if (ids.length === 0) return;

        const p = new URLSearchParams();
        if (folder?.id) {
            p.append('parent_id', folder.id);
        }

        for (let id of ids) {
            p.append('ids[]', id);
        }

        let url = route('file.download');
        if (sharedWithMe) {
            url = route('file.downloadSharedWithMe');
        }

        if (sharedByMe) {
            url = route('file.downloadSharedByMe');
        }

        httpGet(url + '?' + p.toString()).then((res) => {
            if (!res.url) return;

            const a = document.createElement('a');
            a.download = res.filename;
            a.href = res.url;
            a.click();
        });

        onDownload();
    };

    return (
        <button
            onClick={download}
            className={className || 'items-center rounded-full p-1 my-2 mr-2 hover:bg-slate-50 hover:shadow-md'}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Download"
        >
            <ArrowDownTrayIcon className="w-5 h-5" />
            <p className="ml-2">{title}</p>
        </button>
    );
};

export default DownloadFilesButton;
