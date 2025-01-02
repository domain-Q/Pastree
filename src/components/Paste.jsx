import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerms] = useState("");

  // Filtered data based on search term
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
    // toast.success("Paste deleted successfully");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerms(e.target.value)}
          className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Pastes List */}
      <div className="grid gap-6">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 text-white">
                {paste.title}
              </h3>

              {/* Content */}
              <p className="text-lg text-gray-300 mb-4">{paste.content}</p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Link
                  to={`/?pasteId=${paste?.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Edit
                </Link>

                <Link
                  to={`/pastes/${paste?.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(paste?.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Copy
                </button>
                <button
  onClick={() => {
    const pasteUrl = `${window.location.origin}/pastes/${paste?.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: paste?.title || "Untitled Paste",
          text: paste?.content || "No content available",
          url: pasteUrl,
        })
        .then(() => {
          toast.success("Paste shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing paste:", error);
          toast.error("Failed to share the paste.");
        });
    } else {
      navigator.clipboard.writeText(pasteUrl);
      toast.success("Link copied to clipboard. Share it manually!");
    }
  }}
  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
>
  Share
</button>

              </div>

              {/* Date and Time */}
              <div className="text-sm text-gray-400 italic">
                Created on: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
