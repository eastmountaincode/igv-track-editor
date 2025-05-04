import { useAtom } from 'jotai';
import TrackItem from './TrackItem';
import { sessionAtom, trackCountAtom, shimmerTrackTypesAtom, selectedTrackTypesAtom } from '../../atoms';

function TrackViewer() {
  const [session] = useAtom(sessionAtom);
  const [trackCount] = useAtom(trackCountAtom);
  const [shimmerTrackTypes] = useAtom(shimmerTrackTypesAtom);
  const [selectedTypes] = useAtom(selectedTrackTypesAtom);
  
  return (
    <div className="flex-auto flex-grow flex flex-col gap-4" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <h2 className="text-2xl font-bold">Track Viewer</h2>
      {session ? (
        <>
          <div className="p-4 bg-neutral-700 rounded-lg mb-2 text-white text-opacity-90">
            <p>Total tracks: {trackCount}</p>
          </div>
          <div className="flex flex-col gap-2" style={{ overflow: 'hidden' }}>
            {session.tracks.map((track, index) => (
              <TrackItem 
                key={index} 
                track={track} 
                number={index + 1}
                shimmer={track.type ? shimmerTrackTypes.includes(track.type) : false}
                selected={track.type ? selectedTypes.includes(track.type) : false}
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

export default TrackViewer; 