import React, { useState } from 'react';

const ThreeDotMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUpload = () => {
    // Implement upload functionality here
    console.log('Upload clicked');
    setIsOpen(false); // Close the menu after action
  };

  const handleModify = () => {
    // Implement modify functionality here
    console.log('Modify clicked');
    setIsOpen(false); // Close the menu after action
  };

  const handleDownload = () => {
    // Implement download functionality here
    console.log('Download clicked');
    setIsOpen(false); // Close the menu after action
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          <span className="material-icons">more_vert</span> {/* Using Material Icons for three dots */}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={handleUpload}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Upload
            </button>
            <button
              onClick={handleModify}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Modify
            </button>
            <button
              onClick={handleDownload}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Download Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
