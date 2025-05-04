import './App.css';
import FileManager from './components/FileManager/FileManager';
import TrackViewer from './components/TrackViewer/TrackViewer';
import TrackEditor from './components/TrackEditor';

function App() {
  return (
    <div className="app-container">
      <FileManager />
      <TrackViewer />
      <TrackEditor />
    </div>
  );
}

export default App;
