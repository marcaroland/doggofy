// Import React hooks and the Navbar component
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"; // Import axios for making API requests

// Define the main Home component
const Home = () => {
  // ----------------------
  // STATE DEFINITIONS
  // ----------------------

  const [image, setImage] = useState(null); // Stores the uploaded image file
  const [preview, setPreview] = useState(null); // Stores the image preview URL for displaying the photo
  const [prediction, setPrediction] = useState(""); // Stores the prediction result string
  const [loading, setLoading] = useState(false); // Indicates whether the prediction is in progress

  // ----------------------
  // HANDLERS
  // ----------------------

  // Handles the image file upload and generates a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file from input
    setImage(file); // Save the file to state
    setPreview(URL.createObjectURL(file)); // Create and store a preview URL
    setPrediction(""); // Clear any previous prediction
  };

  // Handles the prediction request to FastAPI
  const handlePredict = async () => {
    setLoading(true); // Set loading to true to disable the button and show spinner

    const formData = new FormData();
    formData.append("file", image); // Append the image file to FormData

    try {
      // Make a POST request to the FastAPI endpoint with the image
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      setPrediction(response.data.predicted_breed); // Set the predicted breed
    } catch (error) {
      console.error("Error during prediction:", error);
      setPrediction("Failed to predict breed.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // ----------------------
  // UI RENDER
  // ----------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center px-4 py-10">
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero Section: title and subtitle */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
          Dog Breed Identifier
        </h2>
        <p className="text-gray-600 text-lg mt-2">
          Upload a dog photo — our AI will guess the breed!
        </p>
      </div>

      {/* Upload Card: file input, image preview, predict button, and result */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-5 border border-gray-200">
        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-sm text-gray-600"
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Uploaded dog"
            className="w-64 h-64 object-cover rounded-xl shadow-lg border"
          />
        )}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={!image || loading} // Disable when no image or during prediction
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-md font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Predicting..." : "Predict Breed"}
        </button>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-3 text-xl font-semibold text-indigo-800 animate-fade-in">
            🎉 Prediction: {prediction}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-gray-400 text-sm text-center">
        © 2025 DoggoApp • Built with React, Tailwind, and 🐶
      </footer>
    </div>
  );
};

// Export the component for use in routing
export default Home;
