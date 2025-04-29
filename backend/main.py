import sys
import os
import pandas as pd
import psutil
import joblib

from tensorflow.keras.models import load_model

# Add the project root (doggofy_app) to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from config_loader import ConfigLoader
from data_processor import DataProcessor
from modelling import Modelling



def main() -> None:
    """
    Main function to run the dog breed classification pipeline.
    """
    # Load configuration
    config = ConfigLoader.read_config("/home/marcaroland/workspace/doggofy_app/backend/config.yaml")

    # Load and encode labels
    labels = pd.read_csv(config['labels'])
    processor = DataProcessor(config)
    labels = processor.encode_labels(labels)

    # Create train and validation datasets
    train_ds, val_ds = processor.create_dataset(labels)

    model = Modelling(config, processor.label_encoder)
    model.model = load_model('/home/marcaroland/workspace/doggofy_app/backend/saved_models/doggofy_model.keras')

    label_encoder = joblib.load("/home/marcaroland/workspace/doggofy_app/backend/saved_models/label_encoder.pkl")

    # Predict a single image
    test_image_path = "/home/marcaroland/workspace/doggofy_app/data/test/00a3edd22dc7859c487a64777fc8d093.jpg"
    predicted_breed = model.predict(test_image_path)
    print(f"Predicted class index: {predicted_breed}")


if __name__ == "__main__":
    main()
