import React, { useState } from "react";
import axios from "axios";
import background from "../assets/background.jpg";

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
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data.predicted_breed);
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction("Failed to predict breed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content wrapper */}
      <div className="flex-grow flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-5xl flex flex-col items-center space-y-10 text-center text-gray-900">
          {/* Hero Section */}
          <div className="px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
              Discover Your Dog’s Breed with Doggofy!
            </h1>
            <p className="text-base sm:text-lg text-center text-white mt-2">
              Upload a photo and let our AI do the guessing!
            </p>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl text-center w-[90%] max-w-md mx-auto">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded-xl w-full max-w-xs mx-auto"
              />
            )}

            <button
              onClick={handlePredict}
              disabled={!image || loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 mt-4"
            >
              {loading ? "Predicting..." : "Predict Breed"}
            </button>

            {prediction && (
              <div className="mt-2 text-lg font-semibold text-indigo-700">
                🎉 Prediction: {prediction}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <footer className="text-center py-4 text-white drop-shadow-md">
        © 2025 Doggofy App • Built with React, Tailwind, Python, and 🐶
      </footer>
    </div>
  );
};

export default Home;
