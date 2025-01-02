import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);


  const paste = allPaste.find((p) => p.id === id);


  if (!paste) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-300 text-lg">
          Paste not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          View Your Paste
        </h1>

        {/* Title Display */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-400 font-medium mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            disabled
            value={paste.title}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Content Display */}
        <div className="mb-8">
          <label
            htmlFor="content"
            className="block text-gray-400 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={paste.content}
            disabled
            rows={10}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
