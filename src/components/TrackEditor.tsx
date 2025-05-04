import { useState } from 'react';
import { useAtom } from 'jotai';
import { sessionAtom, shimmerTrackTypesAtom, selectedTrackTypesAtom } from '../atoms';
import { getTrackTypeColors } from '../utils/trackColors';
import { FaCheck } from 'react-icons/fa';

// Track types that can be edited
const EDITABLE_TRACK_TYPES = ['alignment', 'annotation'];

// Display mode options
const DISPLAY_MODES = ['EXPANDED', 'SQUISHED', 'FULL'];

function TrackEditor() {
  const [session, setSession] = useAtom(sessionAtom);
  const [selectedTypes, setSelectedTypes] = useAtom(selectedTrackTypesAtom);
  const [height, setHeight] = useState<number>(30); // Default height value
  const [heightInputValue, setHeightInputValue] = useState<string>("30"); // String value for the input
  const [displayMode, setDisplayMode] = useState<string>("EXPANDED"); // Default display mode
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

  // Handle display mode changes
  const handleDisplayModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayMode(e.target.value);
  };

  // Apply height changes to selected track types
  const applyChanges = () => {
    if (!session || selectedTypes.length === 0) return;
    
    const updatedTracks = session.tracks.map(track => {
      if (track.type && selectedTypes.includes(track.type)) {
        return { ...track, height, displayMode };
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
    <div className="track-editor-container flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Track Editor</h2>
      
      {session ? (
        <>
          <button 
            onClick={applyChanges}
            disabled={selectedTypes.length === 0}
            className="mb-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 cursor-pointer disabled:opacity-50 flex items-center justify-center"
          >
            <FaCheck className="mr-2" /> <span>Apply Changes</span>
          </button>
          
          <div className="p-4 bg-neutral-700 rounded-lg">
            <h3 className="text-sm font-semibold mb-2">Select Track Types:</h3>
            <div className="track-type-selector flex flex-col space-y-2">
              {EDITABLE_TRACK_TYPES.map(type => {
                const colors = getTrackTypeColors(type);
                const badgeStyle = {
                  backgroundColor: colors.background,
                  color: colors.text,
                } as React.CSSProperties;
                
                return (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="cursor-pointer"
                    />
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full font-medium"
                      style={badgeStyle}
                    >
                      {type}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          
          <div className="mb-4 p-4 bg-neutral-700 rounded-lg">
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
            
            <div className="property-input mb-2">
              <label className="block mb-1">Display Mode:</label>
              <div className="relative">
                <select
                  value={displayMode}
                  onChange={handleDisplayModeChange}
                  className="border rounded px-2 py-1 w-full appearance-none pr-8 cursor-pointer"
                >
                  {DISPLAY_MODES.map(mode => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
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