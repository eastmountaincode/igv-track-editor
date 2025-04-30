import { useState, useEffect } from 'react';
import { Track } from '../types';

interface TrackItemProps {
  track: Track;
  shimmer?: boolean;
}

function TrackItem({ track, shimmer = false }: TrackItemProps) {
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
  
  return (
    <div className="track-item">
      <div className={`track-header ${isShimmering ? 'shimmer' : ''}`} onClick={toggleExpand}>
        <span className="track-name">{track.name || track.type || `Track ${track.order}`}</span>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
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