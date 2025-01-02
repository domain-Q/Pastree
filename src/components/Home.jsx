import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchparams, setSearchparams] = useSearchParams();
  const pasteId = searchparams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p.id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    const paste = {
      title,
      content: value,
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // Reset form and search params
    setTitle("");
    setValue("");
    setSearchparams({});
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          {pasteId ? "Update Your Paste" : "Create a New Paste"}
        </h1>

        {/* Title Input */}
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
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Content Input */}
        <div className="mb-8">
          <label
            htmlFor="content"
            className="block text-gray-400 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={value}
            placeholder="Enter content here"
            onChange={(e) => setValue(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-200"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
