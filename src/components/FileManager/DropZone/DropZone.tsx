import { useState, useRef } from 'react';
import './DropZone.css';

interface DropZoneProps {
  onFileLoaded: (jsonData: any, fileName: string) => void;
}

function DropZone({ onFileLoaded }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(Date.now()); // Add a key to force input remounting

  // Reset the file input when component re-renders after clearing
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Force remount the input by changing its key
    setKey(Date.now());
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only handle events for the main container, not its children
    if (e.target !== dropZoneRef.current) return;
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setErrorMessage(null); // Clear any previous errors
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null); // Clear any previous errors
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);
        onFileLoaded(jsonData, file.name);
        // Reset input after processing
        resetFileInput();
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        setErrorMessage("Error parsing JSON file. Please make sure it's a valid IGV session file.");
      }
    };
    
    reader.readAsText(file);
  };

  // Open file dialog when button is clicked
  const openFileDialog = () => {
    setErrorMessage(null); // Clear any previous errors
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Prevent click propagation on the file input
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      ref={dropZoneRef}
      className={`drop-zone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input 
        key={key} // Add key to force remount when it changes
        type="file" 
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileChange}
        onClick={handleInputClick}
        style={{ display: 'none' }}
      />
      <div className="drop-zone-content">
        <p className="drag-instruction">Drag and drop an IGV session file (.json) here</p>
        <p className="or-divider">or</p>
        <p className="click-to-upload">Click to select a file</p>
        
        {errorMessage && (
          <div className="error-message mt-4 p-2 bg-red-600/20 text-red-400 rounded-md text-sm">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropZone; 