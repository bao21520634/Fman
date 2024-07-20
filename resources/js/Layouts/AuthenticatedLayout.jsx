import React, { useEffect, useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import Navigation from '@/Components/app/Navigation';
import SearchForm from '@/Components/app/SearchForm';
import UserSettingsDropdown from '@/Components/app/UserSettingsDropdown';
import { FILE_UPLOAD_STARTED, emitter, showErrorDialog, showSuccessNotification } from '@/event-bus';
import { useForm, usePage } from '@inertiajs/react';
import FormProgress from '@/Components/app/FormProgress';
import ErrorDialog from '@/Components/ErrorDialog';
import Notification from '@/Components/Notification';

export default function Authenticated({ children }) {
    const { folder } = usePage().props;

    const fileUploadForm = useForm({
        files: [],
        relative_paths: [],
        parent_id: folder?.id,
    });

    useEffect(() => {
        emitter.on(FILE_UPLOAD_STARTED, handleFilesUpload);
    }, []);

    useEffect(() => {
        if (fileUploadForm.data.files.length) {
            if (!fileUploadForm.processing && fileUploadForm.isDirty)
                fileUploadForm.post(route('file.store'), {
                    // preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                    preserveScroll: true,
                    onSuccess: () => {
                        showSuccessNotification(
                            `${
                                fileUploadForm.data.files.length === 1
                                    ? `${fileUploadForm.data.files.length} file`
                                    : `${fileUploadForm.data.files.length} files`
                            } have been uploaded`,
                        );
                    },
                    onError: (errors) => {
                        let message = '';

                        if (Object.keys(errors).length > 0) {
                            message = errors[Object.keys(errors)[0]];
                        } else {
                            message = 'Error during file upload. Please try again later.';
                        }

                        showErrorDialog(message);
                    },
                    onFinish: () => {
                        fileUploadForm.clearErrors();
                        fileUploadForm.reset();
                    },
                });
        }
    }, [fileUploadForm.data.files]);

    const [dragOver, setDragOver] = useState(false);

    const handleFilesUpload = (files) => {
        fileUploadForm.setData((data) => ({
            ...data,
            files: files,
            relative_paths: [...files].map((file) => file.webkitRelativePath),
        }));
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();

        setDragOver(false);
        const files = e.dataTransfer.files;

        if (!files.length) {
            return;
        }

        handleFilesUpload(files);
    };

    return (
        <div>
            <div className="h-screen bg-slate-50 flex w-full gap-4 select-none">
                <Navigation />
                <main
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={(e) => onDragOver(e)}
                    onDragLeave={(e) => onDragLeave(e)}
                    className="flex flex-col flex-1 px-4 overflow-hidden mb-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <SearchForm />
                        <UserSettingsDropdown />
                    </div>
                    <div
                        className={`flex-1 flex flex-col overflow-hidden ${
                            dragOver && 'border-2 border-blue-300 bg-blue-50 rounded-lg'
                        }`}
                    >
                        {children}
                        {dragOver && (
                            <div className="absolute flex flex-col items-center justify-between w-fit bg-blue-500 rounded-full bottom-6 right-0 left-0 ml-auto mr-auto">
                                <ArrowUpTrayIcon className="text-white w-7 h-7 mt-4 mb-2" />
                                <div className="text-white text-center px-8 pb-4 text-lg">
                                    Drop files here to upload
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <ErrorDialog />
            {fileUploadForm.progress && <FormProgress form={fileUploadForm} />}
            <Notification />
        </div>
    );
}
