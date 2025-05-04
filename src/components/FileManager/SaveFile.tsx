import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, fileInfoAtom } from '../../atoms';
import { FaSave } from 'react-icons/fa';

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
    <div className="flex flex-col gap-2 w-full">
      <div className="relative w-full flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter file name"
          value={fileName}
          onChange={handleChange}
          className="w-full p-2 rounded-l-md bg-[#333] text-white text-opacity-90 border border-[#444] focus:border-slate-200 outline-none"
        />
        <span className="bg-[#575757] text-white text-opacity-40 p-2 border border-[#575757] border-l-0 rounded-r-md text-sm whitespace-nowrap">.json</span>
      </div>
      <p className="text-xs text-gray-400 italic mt-1 mb-2 text-center">.json extension automatically added</p>
      <button 
        className="bg-slate-600 p-2 text-white hover:bg-slate-700 flex items-center justify-center rounded" 
        onClick={handleSave}
        disabled={!session}
      >
        <FaSave className="mr-2" /> <span>Save File</span>
      </button>
    </div>
  );
}

export default SaveFile; 