# Doggofy App

**Doggofy** is a full-stack AI-powered web application that predicts the breed of a dog from an uploaded image. It features a **React + Tailwind CSS** front-end and a **FastAPI + TensorFlow** back-end.

---

## Features

- **Upload Dog Images**: Users can upload photos to identify dog breeds.
- **AI-Powered Predictions**: Uses a pre-trained TensorFlow model to predict breeds.
- **Responsive UI**: Designed with Tailwind CSS for a seamless experience across devices.
- **Breed Info Cards**: Interactive cards show detailed information about predicted breeds.

---

## Project Structure

### Back-End (`/backend`)

Built with **FastAPI** and **TensorFlow**, the backend handles image processing, AI predictions, and model training.

#### Key Files

- `main.py`: FastAPI server with prediction endpoint.
- `modelling.py`: Contains the `Modelling` class for model handling.
- `test_inference.py`: Script to test inference from images.
- `config.yaml`: Central configuration for paths and model settings.
- `data_loader.py`: Loads training and validation data.
- `data_processor.py`: Prepares and encodes datasets.
- `config_loader.py`: Loads settings from `config.yaml`.
- `model_training.ipynb`: Jupyter Notebook for model training.
- `utils.py`: General utility functions.
- `requirements.txt`: Python dependencies.
- `saved_models/`:
  - `doggofy_model.keras`: Pre-trained TensorFlow model.
  - `label_encoder.pkl`: Scikit-learn label encoder.

#### Key Components

- **FastAPI App (`main.py`)**
  - Initializes server and CORS middleware.
  - `POST /predict`: Receives image file, returns predicted breed.

- **Modelling Class (`modelling.py`)**
  - Loads and manages MobileNetV2-based model.
  - Methods: `__init__`, `build`, `fit`, `predict`, `predict_from_bytes`.

- **Data Loader & Processor**
  - `DataLoader`: Loads and structures image data.
  - `DataProcessor`: Encodes labels, creates TensorFlow datasets.

- **Model Training**
  - Conducted via `model_training.ipynb` using transfer learning.

#### Model Details

- **Base Model**: MobileNetV2 (ImageNet pre-trained)
- **Architecture**:
  - Global Average Pooling
  - Dense (512 units, ReLU)
  - Output: 120 classes (Softmax)
- **Training Settings**:
  - Image size: `[224, 224]`
  - Batch size: `16`
  - Epochs: `10`
  - Optimizer: `Adam`
  - Loss: `SparseCategoricalCrossentropy`
- **Config** (`config.yaml`):
  - Paths: Training images, label CSV
  - Model Settings: `EPOCHS`, `BATCH_SIZE`, `TRAINABLE`, `IMG_SIZE`

---

### 🔜 Front-End (`/front-end`)

Developed using **React** and styled with **Tailwind CSS**, the front-end provides a smooth UI for image upload and result display.

#### Key Files

- `src/pages/Home.jsx`: Main page with image upload and results.
- `src/Card.jsx`: Card component displaying breed info.
- `src/index.css`: Global styles.
- `src/assets/`: Contains images and static content.

#### Routing

- `/`: Home page.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- `pip` and `virtualenv`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
