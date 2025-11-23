import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100">
      <div className="text-center">

        {/* Platform Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 drop-shadow-md">
          OpenWork
        </h1>

        {/* 404 Number */}
        <h2 className="text-8xl sm:text-9xl font-extrabold text-gray-800 mt-6">
          404
        </h2>

        {/* Message */}
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist, was moved, or is temporarily unavailable.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="
            inline-block mt-8 px-8 py-3 
            text-white text-lg font-semibold
            bg-gradient-to-r from-indigo-600 to-purple-600
            rounded-xl shadow-lg hover:opacity-90 transition
          "
        >
          Go Back Home
        </Link>

        {/* Subtle Decoration */}
        <div className="mt-10">
          <svg
            className="mx-auto w-40 opacity-80"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#c7d2fe"
              d="M43.6,-74.1C55.6,-68.8,63.8,-55.4,69.7,-42C75.5,-28.6,79,-15.3,79.6,-1.2C80.2,12.8,77.8,25.6,71.7,38.2C65.5,50.7,55.6,63,43.5,68.1C31.3,73.2,15.6,71.1,0.1,70.9C-15.3,70.7,-30.6,72.4,-44.3,67.3C-57.9,62.2,-69.9,50.5,-75.9,36.6C-82,22.7,-82.1,6.4,-78.8,-7.9C-75.4,-22.1,-68.6,-34.3,-59.6,-44.2C-50.7,-54.1,-39.6,-61.7,-27.5,-66.4C-15.5,-71.1,-3.4,-72.9,9.3,-76.1C21.9,-79.4,34.6,-84.3,43.6,-74.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
