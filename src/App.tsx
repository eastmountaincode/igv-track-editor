import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import EditorPage from './components/EditorPage';
import AboutPage from './components/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('editor');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <div className="app-container">
        {currentPage === 'editor' ? <EditorPage /> : <AboutPage />}
      </div>
    </div>
  );
}

export default App;
