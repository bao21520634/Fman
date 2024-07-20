import React from 'react';
import { FolderIcon } from '@heroicons/react/20/solid';
import { isAudio, isCommonFile, isExcel, isImage, isPDF, isText, isVideo, isWord, isZip } from '@/Helper/file-helper';

const FileIcon = ({ file }) => {
    return (
        <div className="w-5 h-5 inline-flex items-center justify-center mr-2">
            {file.is_folder ? (
                <FolderIcon className="w-5 h-5" />
            ) : (
                <div>
                    {isImage(file) && <img className="w-4 h-4" src={`/images/icons/image.png`} />}
                    {isPDF(file) && <img className="w-4 h-4" src={`/images/icons/pdf.png`} />}
                    {isAudio(file) && <img className="w-4 h-4" src={`/images/icons/audio.png`} />}
                    {isVideo(file) && <img className="w-4 h-4" src={`/images/icons/video.png`} />}
                    {isWord(file) && <img className="w-4 h-4" src={`/images/icons/word.png`} />}
                    {isExcel(file) && <img className="w-4 h-4" src={`/images/icons/excel.png`} />}
                    {isZip(file) && <img className="w-4 h-4" src={`/images/icons/zip.png`} />}
                    {isText(file) && <img className="w-4 h-4" src={`/images/icons/txt-file.png`} />}
                    {!isCommonFile(file) && <img className="w-4 h-4" src={`/images/icons/file.png`} />}
                </div>
            )}
        </div>
    );
};

export default FileIcon;
