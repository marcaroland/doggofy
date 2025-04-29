from tensorflow.keras.applications import MobileNetV2
from tensorflow import keras
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import LabelEncoder
from typing import Optional

class Modelling:
    def __init__(self, config: dict, label_encoder: LabelEncoder):
        """
        Initialize the Modelling class with config.

        Args:
            config (dict): Configuration dictionary.
        """
        self.config = config
        self.label_encoder = label_encoder
        self.model: Optional[keras.Model] = None

    def build(self) -> None:
        """
        Build and compile the MobileNetV2-based model.
        """
        base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
        base_model.trainable = self.config['TRAINABLE']

        self.model = keras.models.Sequential([
            base_model,
            keras.layers.GlobalAveragePooling2D(),
            keras.layers.Dense(512, activation='relu'),
            keras.layers.Dense(120, activation='softmax')])

        self.model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    def fit(self, train_dataset: tf.data.Dataset, val_dataset: tf.data.Dataset) -> keras.callbacks.History:
        """
        Train the model on the given datasets.

        Args:
            train_dataset (tf.data.Dataset): Training dataset.
            val_dataset (tf.data.Dataset): Validation dataset.

        Returns:
            keras.callbacks.History: Training history object.
        """
        if self.model is None:
            raise ValueError("Model has not been built. Call `build()` before training.")

        return self.model.fit(train_dataset, validation_data=val_dataset, epochs=self.config['EPOCHS'], verbose=self.config['VERBOSE'])

    def predict(self, image_path: str) -> int:
        """
        Predict the breed index of a single image.

        Args:
            image_path (str): Path to the image file.

        Returns:
            int: Predicted class index.
        """
        if self.model is None:
            raise ValueError("Model has not been built or trained yet.")

        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, self.config['IMG_SIZE']) / 255.0
        image = tf.expand_dims(image, 0)  # Add batch dimension

        preds = self.model.predict(image)
        predicted_class = int(np.argmax(preds, axis=1)[0])
        predicted_breed = self.label_encoder.inverse_transform([predicted_class])[0]

        return predicted_breed


