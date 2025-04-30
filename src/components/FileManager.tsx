import { useAtom } from 'jotai';
import DropZone from './DropZone';
import SaveFile from './SaveFile';
import ClearFile from './ClearFile';
import { sessionAtom, fileInfoAtom } from '../atoms';
import { IGVSession } from '../types';

function FileManager() {
  const [session, setSession] = useAtom(sessionAtom);
  const [fileInfo, setFileInfo] = useAtom(fileInfoAtom);

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
  };

  return (
    <div className="file-manager">
      <h2>File Management</h2>
      
      <DropZone onFileLoaded={handleFileLoaded} />
      
      {session && (
        <div className="file-actions">
          <SaveFile />
          <ClearFile onClear={handleClear} />
        </div>
      )}
    </div>
  );
}

export default FileManager; 