import os
import sys

import joblib
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model

# Add the project root (doggofy_app) to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.config.config_loader import ConfigLoader
from backend.models.modelling import Modelling

label_encoder = joblib.load(
    "/Users/marcaroland/Projects/doggofy/doggofy/backend/saved_models/label_encoder.pkl"
)
loaded_model = load_model(
    "/Users/marcaroland/Projects/doggofy/doggofy/backend/saved_models/doggofy_model.keras"
)
config = ConfigLoader.read_config(
    "/Users/marcaroland/Projects/doggofy/doggofy/backend/config.yaml"
)
modeller = Modelling(config=config, label_encoder=label_encoder, model=loaded_model)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to predict the breed of a dog from an uploaded image.

    Args:
        file (UploadFile): The uploaded image file.

    Returns:
        dict: A dictionary containing the predicted breed.
    """
    contents = await file.read()
    predicted_breed = modeller.predict_from_bytes(contents)
    return {"predicted_breed": predicted_breed}
    return {"predicted_breed": predicted_breed}
