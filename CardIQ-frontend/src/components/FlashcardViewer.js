import React, { useState } from "react";

function FlashcardViewer({ flashcard, questionFirst, handleNext, handlePrev }) {
  const [flipped, setFlipped] = useState(false);

  if (!flashcard) return null;

  const handleFlip = () => setFlipped(!flipped);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* perspective container */}
      <div
        className="relative w-full h-96 perspective cursor-pointer"
        onClick={handleFlip}
      >
        {/* card with preserve-3d and flip */}
        <div
          className={`absolute w-full h-full preserve-3d transition-transform duration-500 ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* front */}
          <div className="absolute w-full h-full backface-hidden bg-white border border-gray-400 rounded-lg shadow-lg flex items-center justify-center p-8 text-3xl text-center">
            {questionFirst ? flashcard.question : flashcard.answer}
          </div>

          {/* back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border border-gray-400 rounded-lg shadow-lg flex items-center justify-center p-8 text-3xl text-center">
            {questionFirst ? flashcard.answer : flashcard.question}
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-6 text-lg">
        <button
          className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={handlePrev}
        >
          Previous
        </button>
        <button
          className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardViewer;