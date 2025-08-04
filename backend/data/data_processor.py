from typing import Tuple

import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder

from backend.data.data_loader import DataLoader


class DataProcessor:
    def __init__(self, config: dict):
        """
        Initialize the DataProcessor with config and label encoder.

        Args:
            config (dict): Configuration dictionary.
        """
        self.config = config
        self.label_encoder = LabelEncoder()
        self.loader = DataLoader(config)

    def encode_labels(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Encode string labels into numeric format.

        Args:
            df (pd.DataFrame): DataFrame containing a 'breed' column.

        Returns:
            pd.DataFrame: DataFrame with an added 'breed_encoded' column.
        """
        df['breed_encoded'] = self.label_encoder.fit_transform(df['breed'])
        return df

    def create_dataset(self, df: pd.DataFrame) -> Tuple[tf.data.Dataset, tf.data.Dataset]:
        """
        Create train and validation datasets from image IDs and encoded labels.

        Args:
            df (pd.DataFrame): DataFrame with 'id' and 'breed_encoded' columns.

        Returns:
            Tuple[tf.data.Dataset, tf.data.Dataset]: Train and validation datasets.
        """
        image_ids = df['id'].values
        encoded_labels = df['breed_encoded'].values

        dataset = tf.data.Dataset.from_tensor_slices((image_ids, encoded_labels))
        dataset = dataset.map(lambda img_id, label: self.loader.read_train_image_and_label(img_id, label))

        dataset = dataset.shuffle(buffer_size=len(image_ids), seed=42)
        train_size = int(self.config['TRAIN_SIZE'] * len(image_ids))

        train_ds = dataset.take(train_size)
        val_ds = dataset.skip(train_size)

        autotune = tf.data.experimental.AUTOTUNE

        train_ds = train_ds.shuffle(self.config['BUFFER_SIZE']).batch(self.config['BATCH_SIZE']).prefetch(1)
        val_ds = val_ds.batch(self.config['BATCH_SIZE']).prefetch(1)

        return train_ds, val_ds

        return train_ds, val_ds
