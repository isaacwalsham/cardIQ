// allows downloading flashcards as JSON file
import React from 'react';

function DownloadButton({ flashcards }) {
  const handleDownload = () => {
    const data = JSON.stringify(flashcards, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.json';
    a.click();
  };

  return (
    <button
      className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
      onClick={handleDownload}
    >
      Download Flashcards
    </button>
  );
}

export default DownloadButton;