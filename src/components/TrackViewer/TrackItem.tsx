import { useState, useEffect } from 'react';
import { Track } from '../../types';
import { getTrackTypeColors } from '../../utils/trackColors';
import './TrackItem.css';

interface TrackItemProps {
  track: Track;
  shimmer?: boolean;
  selected?: boolean;
  number?: number;
}

function TrackItem({ track, shimmer = false, selected = false, number }: TrackItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  
  useEffect(() => {
    if (shimmer) {
      setIsShimmering(true);
      // Remove the shimmer effect after the animation completes
      const timer = setTimeout(() => {
        setIsShimmering(false);
      }, 650); // Slightly longer than animation duration
      
      return () => clearTimeout(timer);
    }
  }, [shimmer]);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Get track name with special handling for sequence tracks
  let trackName = track.name;
  const trackType = track.type || 'unknown';
  
  // Special case for sequence tracks - they're typically reference genome tracks
  if (trackType === 'sequence' && !trackName) {
    trackName = 'Reference Genome';
  } else if (!trackName) {
    // Default fallback for other tracks
    trackName = `Track ${track.order}`;
  }
  
  // Get colors for this track type
  const colors = getTrackTypeColors(trackType);
  
  const badgeStyle = {
    backgroundColor: colors.background,
    color: colors.text,
  } as React.CSSProperties;
  
  const style = selected ? {
    borderColor: colors.text,
  } : {};
  
  return (
    <div className="track-item" style={style}>
      <div className={`track-header ${isShimmering ? 'shimmer' : ''}`} onClick={toggleExpand}>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center min-w-0 flex-1 mr-2">
            {number !== undefined && 
              <span className="track-number mr-2 text-sm text-gray-400 flex-shrink-0">{number}.</span>
            }
            <span className="track-name truncate">{trackName}</span>
          </div>
          <div className="flex items-center flex-shrink-0">
            <span 
              className="px-2 py-0.5 text-xs rounded-full font-medium"
              style={badgeStyle}
            >
              {trackType}
            </span>
            <span className="expand-icon ml-2">{expanded ? '▼' : '▶'}</span>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="track-details">
          {Object.entries(track).map(([key, value]) => (
            <div key={key} className="track-property">
              <span className="property-name">{key}:</span>
              <span className="property-value">
                {typeof value === 'object' 
                  ? JSON.stringify(value) 
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackItem; 