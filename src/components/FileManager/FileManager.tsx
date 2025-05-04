import { useAtom } from 'jotai';
import { useState } from 'react';
import DropZone from './DropZone/DropZone';
import SaveFile from './SaveFile';
import ClearFile from './ClearFile';
import { sessionAtom, fileInfoAtom } from '../../atoms';
import { IGVSession } from '../../types';

function FileManager() {
    const [session, setSession] = useAtom(sessionAtom);
    const [_, setFileInfo] = useAtom(fileInfoAtom);
    const [dropZoneKey, setDropZoneKey] = useState(Date.now());

    // Handle file loaded from DropZone
    const handleFileLoaded = (jsonData: IGVSession, fileName: string) => {
        setSession(jsonData);

        // Extract the base name without extension
        const baseName = fileName.endsWith('.json')
            ? fileName.slice(0, -5)  // Remove .json
            : fileName;

        setFileInfo({
            name: baseName,
            originalName: fileName
        });
    };

    // Clear current session
    const handleClear = () => {
        setSession(null);
        setFileInfo(null);
        // Force remount the DropZone by changing its key
        setDropZoneKey(Date.now());
    };

    return (
        <div className="flex-1 flex flex-col gap-4 min-w-[300px]">
            <h2 className="text-2xl font-bold">File Management</h2>
            <div className="mb-2">
                <DropZone key={dropZoneKey} onFileLoaded={handleFileLoaded} />
            </div>

            {session && (
                <div className="flex flex-col gap-4 w-full">
                    <div className="bg-neutral-700 p-4 rounded-lg">
                        <SaveFile />
                    </div>
                    <div>
                        <ClearFile onClear={handleClear} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileManager; 