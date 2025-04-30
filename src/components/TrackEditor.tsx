import { useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, shimmerTrackTypesAtom } from '../atoms';
import { Track } from '../types';

// Track types that can be edited
const EDITABLE_TRACK_TYPES = ['alignment', 'annotation'];

function TrackEditor() {
  const [session, setSession] = useAtom(sessionAtom);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [height, setHeight] = useState<number>(30); // Default height value
  const [heightInputValue, setHeightInputValue] = useState<string>("30"); // String value for the input
  const [, setShimmerTrackTypes] = useAtom(shimmerTrackTypesAtom);

  // Toggle selection of track types
  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Handle height input changes
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHeightInputValue(value);
    
    // Only update the height state if value is a valid number
    if (value !== "") {
      setHeight(Number(value));
    } else {
      setHeight(0);
    }
  };

  // Apply height changes to selected track types
  const applyChanges = () => {
    if (!session || selectedTypes.length === 0) return;
    
    const updatedTracks = session.tracks.map(track => {
      if (track.type && selectedTypes.includes(track.type)) {
        return { ...track, height };
      }
      return track;
    });
    
    setSession({
      ...session,
      tracks: updatedTracks
    });

    // Trigger shimmer effect by updating the shimmerTrackTypes atom
    setShimmerTrackTypes([...selectedTypes]);
    
    // Clear the shimmer effect after the animation completes
    setTimeout(() => {
      setShimmerTrackTypes([]);
    }, 2100); // Slightly longer than the animation to ensure it completes
  };

  return (
    <div className="track-editor-container">
      <h2>Track Editor</h2>
      
      {session ? (
        <>
          <button 
            onClick={applyChanges}
            disabled={selectedTypes.length === 0}
            className="apply-button mb-4 px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Changes
          </button>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Select Track Types:</h3>
            <div className="track-type-selector flex flex-col space-y-2">
              {EDITABLE_TRACK_TYPES.map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="cursor-pointer"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Properties:</h3>
            
            <div className="property-input mb-2">
              <label className="block mb-1">Height:</label>
              <input 
                type="text"
                inputMode="numeric"
                pattern="[0-9]*" 
                value={heightInputValue}
                onChange={handleHeightChange}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
        </>
      ) : (
        <p>No file loaded. Load an IGV session to edit tracks.</p>
      )}
    </div>
  );
}

export default TrackEditor; 