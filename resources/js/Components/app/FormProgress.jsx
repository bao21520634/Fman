import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

const FormProgress = ({ form }) => {
    return (
        <div>
            <div className="absolute bottom-4 bg-white rounded-xl shadow-sm shadow-gray-400 flex flex-col w-[220px] z-10 px-4 pt-4 pb-5 left-3">
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-base font-semibold select-none">
                        Uploading {form.data.files.length} {form.data.files.length == 1 ? 'item' : 'items'}{' '}
                    </div>
                    <button onClick={() => form.cancel()}>
                        <XMarkIcon className="w-6 h-6 hover:bg-gray-300 hover:rounded-full" />
                    </button>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-blue-900 rounded-full transition-all"
                        style={{ width: `${form.progress.percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default FormProgress;
