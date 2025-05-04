interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-neutral-800 border-b border-neutral-700 mb-4">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">IGV Track Editor</h1>
        
        <nav className="flex gap-6">
          <button 
            onClick={() => onNavigate('editor')}
            className={`text-lg ${currentPage === 'editor' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            Editor
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className={`text-lg ${currentPage === 'about' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            About
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header; 