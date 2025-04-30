import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, fileInfoAtom } from '../atoms';

function SaveFile() {
  const [fileName, setFileName] = useState<string>('');
  const [session] = useAtom(sessionAtom);
  const [fileInfo] = useAtom(fileInfoAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with the original filename when a session is loaded
  useEffect(() => {
    if (fileInfo && fileInfo.name) {
      // Use the name from the file info
      setFileName(fileInfo.name);
    } else if (session) {
      // Fallback to a default name if somehow we don't have file info
      setFileName('igv_session');
    }
  }, [session, fileInfo]);

  const handleSave = () => {
    if (!session) return;
    
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || 'igv_session'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle changes to filename input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any .json extension if the user types it
    let value = e.target.value;
    if (value.endsWith('.json')) {
      value = value.slice(0, -5);
      
      // Set cursor position correctly after removing .json
      setTimeout(() => {
        if (inputRef.current) {
          const pos = value.length;
          inputRef.current.setSelectionRange(pos, pos);
        }
      }, 0);
    }
    
    setFileName(value);
  };

  return (
    <div className="save-group">
      <div className="simple-filename-container">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={handleChange}
          className="simple-filename-input"
        />
        <span className="simple-extension">.json</span>
      </div>
      <p className="text-xs text-gray-500 italic mt-1 mb-2 text-center dark:text-gray-400">.json extension automatically added</p>
      <button 
        className="save-button" 
        onClick={handleSave}
        disabled={!session}
      >
        Save File
      </button>
    </div>
  );
}

export default SaveFile; 