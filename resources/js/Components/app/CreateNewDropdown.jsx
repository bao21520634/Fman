import React, { useState } from 'react';
import { Transition } from '@tailwindui/react';
import { Menu } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import CreateFolderModal from '@/Components/app/CreateFolderModal';
import FileUploadMenuItem from '@/Components/app/FileUploadMenuItem';
import FolderUploadMenuItem from '@/Components/app/FolderUploadMenuItem';

const CreateNewDropdown = () => {
    const [isCreateFolderModal, setIsCreateFolderModal] = useState(false);

    const showCreateFolderModal = (e) => {
        e.preventDefault();

        setIsCreateFolderModal(true);
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex w-full justify-center gap-x-1.5 rounded-xl bg-white px-4 py-4 text-sm font-semibold text-gray-900 shadow-md hover:bg-gray-50">
                    <PlusIcon className="-mr-1 h-5 w-5 text-gray-800" aria-hidden="true" />
                    New
                </Menu.Button>

                <Transition
                    show={true}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <a
                                    href="#"
                                    onClick={(e) => showCreateFolderModal(e)}
                                    className="text-gray-700 block px-4 py-2 text-sm"
                                >
                                    New Folder
                                </a>
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <FileUploadMenuItem />
                            <FolderUploadMenuItem />
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <CreateFolderModal show={isCreateFolderModal} onClose={() => setIsCreateFolderModal(false)} />
        </>
    );
};

export default CreateNewDropdown;
