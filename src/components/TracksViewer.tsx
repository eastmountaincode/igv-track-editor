import { useAtom } from 'jotai';
import TrackItem from './TrackItem';
import { sessionAtom, trackCountAtom, shimmerTrackTypesAtom } from '../atoms';

function TracksViewer() {
  const [session] = useAtom(sessionAtom);
  const [trackCount] = useAtom(trackCountAtom);
  const [shimmerTrackTypes] = useAtom(shimmerTrackTypesAtom);
  
  return (
    <div className="tracks-container">
      <h2>Tracks</h2>
      {session ? (
        <>
          <div className="session-info">
            <p>Total tracks: {trackCount}</p>
          </div>
          <div className="tracks-list">
            {session.tracks.map((track, index) => (
              <TrackItem 
                key={index} 
                track={track} 
                shimmer={track.type ? shimmerTrackTypes.includes(track.type) : false}
              />
            ))}
          </div>
        </>
      ) : (
        <p>No file loaded. Drag an IGV session file to get started.</p>
      )}
    </div>
  );
}

export default TracksViewer; 