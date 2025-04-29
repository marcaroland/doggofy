import tensorflow as tf
from typing import Tuple


class DataLoader:
    def __init__(self, config: dict):
        """
        Initialize the DataLoader with a configuration.

        Args:
            config (dict): Configuration dictionary.
        """
        self.config = config

    def read_train_image_and_label(self, image_id: tf.Tensor, label: tf.Tensor) -> Tuple[tf.Tensor, tf.Tensor]:
        """
        Load and preprocess an image from the training directory.

        Args:
            image_id (tf.Tensor): Image ID without the file extension.
            label (tf.Tensor): Corresponding label.

        Returns:
            Tuple[tf.Tensor, tf.Tensor]: Preprocessed image and label.
        """
        image_filename = tf.strings.join([image_id, ".jpg"])
        image_path = tf.strings.join([self.config['IMAGE_TRAIN_DIR'], image_filename], separator="/")

        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)

        size_tuple = self.config['IMG_SIZE']
        size = tf.constant(size_tuple, dtype=tf.int32)
        image = tf.image.resize(image, size) / 255.0

        return image, label
