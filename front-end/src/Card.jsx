import React, { useState } from "react";

const Card = ({ title, image, backContent }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-sm h-80 perspective mx-auto"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl backface-hidden flex flex-col items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="w-50 h-50 object-contain mb-4"
          />
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-500 mt-2">
            Tap to flip for more info
          </p>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full bg-indigo-100 rounded-2xl shadow-xl backface-hidden rotate-y-180 flex flex-col items-center justify-center p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">{title} - Health Info</h3>
          <p className="text-sm">{backContent}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
