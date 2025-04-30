import './App.css';
import FileManager from './components/FileManager';
import TracksViewer from './components/TracksViewer';
import TrackEditor from './components/TrackEditor';

function App() {
  return (
    <div className="app-container">
      <FileManager />
      <TracksViewer />
      <TrackEditor />
    </div>
  );
}

export default App;
