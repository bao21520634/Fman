import React, { useEffect, useMemo, useState } from 'react';
import { Transition } from '@tailwindui/react';
import { Menu } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import DeleteFilesButton from './DeleteFilesButton';
import DownloadFilesButton from './DownloadFilesButton';
import StarFilesButton from './StarFilesButton';
import DeleteForeverButton from './DeleteForeverButton';
import RestoreFilesButton from './RestoreFilesButton';
import ShareFilesButton from './ShareFilesButton';
import RenameFileButton from './RenameFileButton';

const contextMenuWidth = 200;

const ContextMenu = ({
    ids,
    show,
    points,
    options = [],
    sharedWithMe = false,
    sharedByMe = false,
    isAllStarred = false,
    onHideContextMenu = () => {},
    onClearAll = () => {},
}) => {
    const { folder } = usePage().props;

    const contextMenuHeight = useMemo(() => options.length * 40, [options]);

    const menuPositions = useMemo(() => {
        var x = points.x,
            y = points.y;

        if (x >= window.innerWidth - contextMenuWidth) {
            x = points.x - contextMenuWidth;
        } else {
            x = points.x;
        }

        if (y >= window.innerHeight - contextMenuHeight) {
            y = points.y - contextMenuHeight;
        } else {
            y = points.y;
        }

        return { x, y };
    }, [points]);

    return (
        <div
            className={`absolute ${!show && 'hidden'}`}
            style={{ top: `${menuPositions.y}px`, left: `${menuPositions.x}px` }}
        >
            <Menu as="div" className="relative inline-block text-left">
                <Transition
                    show={true}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div
                        style={{ width: `${contextMenuWidth}px`, height: `${contextMenuHeight}px` }}
                        className={`flex flex-col items-start justify-center divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden`}
                    >
                        {options.includes('rename') && ids.length === 1 && (
                            <RenameFileButton
                                title={'Rename'}
                                id={ids[0]}
                                onRename={onHideContextMenu}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></RenameFileButton>
                        )}
                        {options.includes('download') && (
                            <DownloadFilesButton
                                title={'Download'}
                                ids={ids}
                                sharedByMe={sharedByMe}
                                sharedWithMe={sharedWithMe}
                                onDownload={onHideContextMenu}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></DownloadFilesButton>
                        )}
                        {options.includes('share') && (
                            <ShareFilesButton
                                title={'Share'}
                                selectedIds={ids}
                                onShare={onHideContextMenu}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></ShareFilesButton>
                        )}
                        {options.includes('star') && (
                            <StarFilesButton
                                title={isAllStarred ? 'Remove from starred' : 'Add to starred'}
                                selectedIds={ids}
                                isAllStarred={isAllStarred}
                                onStar={onClearAll}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></StarFilesButton>
                        )}
                        {options.includes('delete') && (
                            <DeleteFilesButton
                                title={'Move to trash'}
                                deleteIds={ids}
                                onDelete={onClearAll}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></DeleteFilesButton>
                        )}
                        {options.includes('restore') && (
                            <RestoreFilesButton
                                title={'Restore'}
                                selectedIds={ids}
                                onRestore={onClearAll}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></RestoreFilesButton>
                        )}
                        {options.includes('deleteForever') && (
                            <DeleteForeverButton
                                title={'Delete forever'}
                                deleteIds={ids}
                                onDelete={onClearAll}
                                className="flex items-center w-full h-full p-2 text-start hover:bg-blue-200"
                            ></DeleteForeverButton>
                        )}
                    </div>
                </Transition>
            </Menu>
        </div>
    );
};

export default ContextMenu;
