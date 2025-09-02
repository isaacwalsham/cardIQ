import React, { useState } from 'react';

function Flashcard({ card, questionFirst }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-48 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* front */}
        <div className="absolute w-full h-full backface-hidden bg-white border rounded-lg flex items-center justify-center p-4 text-center">
          {questionFirst ? card.question : card.answer}
        </div>
        {/* back */}
        <div className="absolute w-full h-full backface-hidden bg-gray-200 border rounded-lg flex items-center justify-center p-4 text-center rotate-y-180">
          {questionFirst ? card.answer : card.question}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;