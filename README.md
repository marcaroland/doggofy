# Doggofy App

Doggofy is a web application that uses AI to predict the breed of a dog from an uploaded image. The project consists of a **React front-end** and a **FastAPI back-end**, with a TensorFlow model for inference.

---

## Features

- **Upload Dog Images**: Users can upload images of dogs to identify their breed.
- **AI-Powered Predictions**: The back-end uses a pre-trained TensorFlow model to predict the breed.
- **Responsive Design**: The front-end is built with Tailwind CSS for a modern and responsive UI.
- **Interactive Cards**: Displays additional information about dog breeds in a visually appealing card format.

---

## Project Structure

### Back-End (`/backend`)
The back-end is built with **FastAPI** and serves the AI model for predictions.

- **Key Files**:
  - `main.py`: The entry point for the FastAPI server.
  - `modelling.py`: Contains the `Modelling` class for handling the TensorFlow model.
  - `test_inference.py`: A script to test the model's inference capabilities.
  - `config.yaml`: Configuration file for model settings and paths.
  - `saved_models/`: Directory containing the pre-trained TensorFlow model and label encoder.

- **Endpoints**:
  - `POST /predict`: Accepts an image file and returns the predicted breed.

### Front-End (`/front-end`)
The front-end is built with **React** and styled using **Tailwind CSS**.

- **Key Files**:
  - `src/pages/Home.jsx`: The main page where users can upload images and view predictions.
  - `src/Card.jsx`: A reusable card component for displaying breed information.
  - `src/index.css`: Custom styles for the application.
  - `src/assets/`: Contains static assets like images.

- **Routing**:
  - `/`: Home page.

---

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.10 or higher)
- **pip** and **virtualenv**