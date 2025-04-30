import os
import tensorflow as tf
import joblib
from tensorflow.keras.models import load_model
from modelling import Modelling
from config_loader import ConfigLoader

# Paths to the model, label encoder, and test image
model_path = "./saved_models/doggofy_model.keras"
label_encoder_path = "./saved_models/label_encoder.pkl"
test_image_path = "/Users/marcaroland/Projects/doggofy/doggofy/backend/saved_models/AMERICAN_STAFFORDSHIRE_TERRIER,_Zican’s_Bz_Ez_Dragon_(24208348891).2.jpg"  # Replace with your .jpg file name
config_path = "./config.yaml"

# Load the configuration
config = ConfigLoader.read_config(config_path)

# Load the model and label encoder
loaded_model = load_model(model_path)
label_encoder = joblib.load(label_encoder_path)

# Initialize the Modelling class
modeller = Modelling(config=config, label_encoder=label_encoder, model=loaded_model)

# Test the prediction
try:
    print("Testing inference...")
    image_bytes = tf.io.read_file(test_image_path).numpy()  # Read the image as bytes
    predicted_breed = modeller.predict_from_bytes(image_bytes)  # Make prediction
    print(f"Predicted breed: {predicted_breed}")
except Exception as e:
    print(f"Error during inference: {e}")
