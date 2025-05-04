import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">About IGV Track Editor</h2>
      
      <div className="mb-8">
        <p className="mb-4 text-lg">
          A simple tool to edit IGV session files.
        </p>
        <p className="mb-4 text-lg">
          Allows editing multiple tracks at once. It's a pain to set the height of each track individually in IGV, 
          for example, so this is my attempt at a solution. For now it's just for editing the height and display mode 
          of many tracks at once, but if more features are desired I'll add them.
        </p>
      </div>
      
      <div className="mt-12">
        <div className="flex space-x-5">
          <a
            href="https://andrew-boylan.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-200 hover:text-blue-400 transition-colors"
          >
            <FaGlobe />
          </a>
          <a
            href="https://github.com/eastmountaincode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-200 hover:text-blue-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-boylan-92842810a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-200 hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:andreweboylan@gmail.com"
            className="text-2xl text-gray-200 hover:text-blue-400 transition-colors"
          >
            <MdEmail />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage; 