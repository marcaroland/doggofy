import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction("");
  };

  const handlePredict = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setPrediction("Golden Retriever 🐶");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center px-4 py-10">
      {/* Navbar placeholder */}
      <Navbar />

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
          Dog Breed Identifier
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Upload a dog photo — our AI will guess the breed!
        </p>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-5 border border-gray-200">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-gray-600"
        />

        {preview && (
          <img
            src={preview}
            alt="Uploaded dog"
            className="w-64 h-64 object-cover rounded-xl shadow-lg border"
          />
        )}

        <button
          onClick={handlePredict}
          disabled={!image || loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Predicting..." : "Predict Breed"}
        </button>

        {prediction && (
          <div className="mt-3 text-xl font-semibold text-indigo-800 animate-fade-in">
            🎉 Prediction: {prediction}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-sm text-center">
        © 2025 DoggoApp • Built with React, Tailwind, and 🐶
      </footer>
    </div>
  );
};

export default Home;
