import FileManager from './FileManager/FileManager';
import TrackViewer from './TrackViewer/TrackViewer';
import TrackEditor from './TrackEditor';

function EditorPage() {
  return (
    <>
      <FileManager />
      <TrackViewer />
      <TrackEditor />
    </>
  );
}

export default EditorPage; 