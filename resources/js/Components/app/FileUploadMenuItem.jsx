import { FILE_UPLOAD_STARTED, emitter } from '@/event-bus';
import React from 'react';

const FileUploadMenuItem = () => {
    const handleFileInput = (e) => {
        emitter.emit(FILE_UPLOAD_STARTED, e.target.files);
    };

    return (
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm relative">
            <label className="inline-block cursor-pointer">
                Upload File
                <input
                    type="file"
                    className="absolute left-0 top-0 bottom-0 right-0 hidden"
                    onChange={(e) => handleFileInput(e)}
                    multiple
                />
            </label>
        </a>
    );
};

export default FileUploadMenuItem;
