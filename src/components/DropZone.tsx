import { useState } from 'react';

interface DropZoneProps {
  onFileLoaded: (jsonData: any, fileName: string) => void;
}

function DropZone({ onFileLoaded }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          onFileLoaded(jsonData, file.name);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert("Error parsing JSON file. Please make sure it's a valid IGV session file.");
        }
      };
      
      reader.readAsText(file);
    }
  };

  return (
    <div 
      className={`drop-zone ${dragActive ? 'active' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <p>Drag and drop an IGV session file (.json) here</p>
    </div>
  );
}

export default DropZone; 