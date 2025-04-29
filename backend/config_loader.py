import yaml
from typing import Dict

class ConfigLoader:
    @staticmethod
    def read_config(path: str) -> Dict:
        """
        Load the configuration from a YAML file.

        Args:
            path (str): Path to the YAML configuration file.

        Returns:
            dict: Parsed configuration dictionary.
        """
        with open(path, "r") as file:
            return yaml.safe_load(file)
