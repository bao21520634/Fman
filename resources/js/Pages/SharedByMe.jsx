import React, { useMemo, useState, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FileIcon from '@/Components/app/FileIcon';
import { httpGet } from '@/Helper/http-helper';
import useOuterClick from '@/hooks/useOuterClick';
import ContextMenu from '@/Components/app/ContextMenu';
import DownloadFilesButton from '@/Components/app/DownloadFilesButton';

const Trash = ({ files, folder, ancestors }) => {
    const loadMoreIntersect = useRef(null);
    const [allFiles, setAllFiles] = useState({
        data: files.data,
        next: files.links.next,
    });

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState({});
    const [selectedFileWithoutKey, setSelectedFileWithoutKey] = useState(null);
    const [prevSelection, setPrevSelection] = useState(null);
    const [isShowContextMenu, setIsShowContextMenu] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    const innerRef = useOuterClick((e) => {
        setIsShowContextMenu(false);
    });

    const selectedFileIds = useMemo(
        () =>
            Object.entries(selectedFiles)
                .filter((a) => a[1])
                .map((a) => allFiles.data[a[0]].id),
        [selectedFiles],
    );

    const isAllSelectedStarred = useMemo(() => {
        for (const [key, value] of Object.entries(selectedFiles)) {
            if (value) {
                if (!allFiles.data[key].is_starred) return false;
            }
        }
        return true;
    }, [selectedFiles]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                rootMargin: '-300px 0px 0px 0px',
            },
        );

        if (loadMoreIntersect.current) observer.observe(loadMoreIntersect.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        setAllFiles({
            data: files.data,
            next: files.links.next,
        });
    }, [files]);

    useEffect(() => {
        if (isIntersecting) {
            loadMore();
        }
    }, [isIntersecting]);

    const loadMore = () => {
        if (allFiles.next === null) {
            return;
        }

        httpGet(allFiles.next).then((res) => {
            setAllFiles((preData) => ({ data: [...preData.data, ...res.data], next: res.links.next }));
        });
    };

    const handleSelectFile = ({ e, index: currentSelection, file }) => {
        if (e.button === 0) {
            if (e.ctrlKey) {
                setSelectedFileWithoutKey(currentSelection);
                setSelectedFiles((preData) => ({ ...preData, [currentSelection]: !selectedFiles[currentSelection] }));
                setPrevSelection(null);
            } else if (e.shiftKey) {
                if (selectedFileWithoutKey == null) {
                    setSelectedFileWithoutKey(currentSelection);
                    setSelectedFiles((preData) => ({ ...preData, [currentSelection]: true }));
                    setPrevSelection(null);
                } else {
                    const res = {};

                    if (prevSelection !== null) {
                        allFiles.data.forEach((file, i) => {
                            if (
                                (i >= selectedFileWithoutKey && i <= prevSelection) ||
                                (i >= prevSelection && i <= selectedFileWithoutKey)
                            ) {
                                res[i] = false;
                            }

                            if (selectedFiles[i]) {
                                // res[i] maybe undefined,.... new res[i] is actually true if res[i] is false
                                res[i] = selectedFiles[i] && res[i] !== false;
                            }

                            if (
                                (i >= selectedFileWithoutKey && i <= currentSelection) ||
                                (i >= currentSelection && i <= selectedFileWithoutKey)
                            ) {
                                res[i] = true;
                                setPrevSelection(currentSelection);
                            }
                        });
                    } else {
                        allFiles.data.forEach((file, i) => {
                            res[i] =
                                (i >= selectedFileWithoutKey && i <= currentSelection) ||
                                (i >= currentSelection && i <= selectedFileWithoutKey) ||
                                selectedFiles[i];
                        });

                        setPrevSelection(currentSelection);
                    }

                    setSelectedFiles(res);
                }
            } else {
                setSelectedFileWithoutKey(currentSelection);
                setSelectedFiles({ [currentSelection]: true });
                setPrevSelection(null);
            }
        }
    };

    const onSelectAll = (e) => {
        if (e.ctrlKey && e.code === 'KeyA') {
            allFiles.data.forEach((file, index) => {
                setSelectedFiles((preData) => ({ ...preData, [index]: true }));
            });
            setSelectedFileWithoutKey(null);
            setPrevSelection(null);
        }
    };

    const handleContextMenu = ({ e, index: currentSelection }) => {
        e.preventDefault();

        setPoints({
            x: e.pageX,
            y: e.pageY,
        });

        const selectedFilesArray = Object.keys(selectedFiles).filter(function (key) {
            return selectedFiles[key];
        });

        if (!selectedFilesArray.includes(currentSelection.toString())) {
            setSelectedFileWithoutKey(currentSelection);
            setSelectedFiles({ [currentSelection]: true });
            setPrevSelection(null);
        }

        setIsShowContextMenu(true);
    };

    const clearSelections = () => {
        setPrevSelection(null);
        setSelectedFileWithoutKey(null);
        setSelectedFiles({});
        setIsShowContextMenu(false);
    };

    return (
        <AuthenticatedLayout>
            <div className="bg-white rounded-t-3xl" onContextMenu={(e) => e.preventDefault()}>
                {Object.values(selectedFiles).reduce((pre, file) => pre + (file === true ? 1 : 0), 0) === 0 ? (
                    <nav className="flex items-center justify-between p-4  text-md font-bold text-gray-700 select-none">
                        Shared by me
                    </nav>
                ) : (
                    <div className="bg-slate-100 w-full h-full inline-flex items-center justify-between mb-3 rounded-t-3xl">
                        <div className="flex items-center ml-2">
                            <DownloadFilesButton sharedByMe={true} ids={selectedFileIds} />
                        </div>
                        <div className="flex items-center">
                            <button
                                className="rounded-full p-[2px] mx-2 hover:bg-slate-50 hover:shadow-md"
                                onClick={() => clearSelections()}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Clear Selection"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div
                className="h-full w-full rounded-b-3xl overflow-hidden bg-white"
                onContextMenu={(e) => e.preventDefault()}
            >
                {!allFiles.data.length ? (
                    <div className="py-8 text-center text-lg text-gray-400">There is no data is this folder</div>
                ) : (
                    <div
                        className="flex-1 h-full w-full overflow-x-hidden overflow-y-scroll outline-0"
                        tabIndex={-1}
                        onKeyDown={(e) => onSelectAll(e)}
                    >
                        <table className="min-w-full">
                            <thead className="border-b shadow-sm bg-white sticky top-0">
                                <tr>
                                    <th className="text-sm font-semibold text-gray-900 pl-4 py-4 text-left">Name</th>
                                    <th className="text-sm font-semibold text-gray-900 py-4 text-left">Owner</th>
                                    <th className="text-sm font-semibold text-gray-900 py-4 text-left">Trashed Date</th>
                                    <th className="text-sm font-semibold text-gray-900 py-4 text-left">Size</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFiles.data.map((file, index) => (
                                    <tr
                                        key={file.id}
                                        className={`border-b  transition duration-300 ease-in-out cursor-pointer ${
                                            selectedFiles[index] ? 'bg-blue-100' : 'bg-white hover:bg-slate-100'
                                        }`}
                                        onDoubleClick={() => openFolder(file)}
                                        onClick={(e) => handleSelectFile({ e, index, file })}
                                        onContextMenu={(e) => handleContextMenu({ e, index })}
                                    >
                                        <td className="pl-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                                            <div className="flex items-center">
                                                <FileIcon file={file} />
                                                <span className="ml-2 truncate w-96">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                                            {file.owner}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                                            {file.deleted_at}
                                        </td>
                                        <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900 items-center">
                                            {!file.is_folder && file.size}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div ref={innerRef}>
                            <ContextMenu
                                ids={selectedFileIds}
                                show={isShowContextMenu}
                                points={points}
                                options={['download']}
                                sharedByMe={true}
                                isAllStarred={isAllSelectedStarred}
                                onHideContextMenu={() => setIsShowContextMenu(false)}
                                onClearAll={clearSelections}
                            />
                        </div>

                        <div ref={loadMoreIntersect}></div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Trash;
