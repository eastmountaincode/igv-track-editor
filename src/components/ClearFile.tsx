import { useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom } from '../atoms';

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
    <div className="clear-group">
      {!showConfirm ? (
        <button 
          className="clear-button cursor-pointer" 
          onClick={handleClearClick}
          disabled={!session}
        >
          Clear File
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-sm">Confirm Clear?</span>
          <button 
            onClick={handleConfirm}
            className="px-2 py-1 bg-slate-500 text-white text-sm rounded hover:bg-slate-600 cursor-pointer"
          >
            Y
          </button>
          <button 
            onClick={handleCancel}
            className="px-2 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 cursor-pointer"
          >
            N
          </button>
        </div>
      )}
    </div>
  );
}

export default ClearFile; 