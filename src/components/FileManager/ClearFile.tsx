import { useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom } from '../../atoms';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface ClearFileProps {
  onClear: () => void;
}

function ClearFile({ onClear }: ClearFileProps) {
  const [session] = useAtom(sessionAtom);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onClear();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {!showConfirm ? (
        <button 
          className="flex items-center justify-center bg-gray-300 p-2 rounded ms-4 me-4 text-gray-700 hover:bg-gray-400" 
          onClick={handleClearClick}
          disabled={!session}
        >
          <FaTrash className="mr-2" /> <span>Clear File</span>
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-sm">Confirm Clear?</span>
          <button 
            onClick={handleConfirm}
            className="px-2 py-1 bg-slate-600 text-white text-sm rounded hover:bg-slate-700 cursor-pointer flex items-center justify-center"
          >
            <FaCheck />
          </button>
          <button 
            onClick={handleCancel}
            className="px-2 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 cursor-pointer flex items-center justify-center"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
}

export default ClearFile; 