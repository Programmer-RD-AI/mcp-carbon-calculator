import os
from functools import lru_cache

from dotenv import load_dotenv
from src.models import EmissionFactors
from src.utils import load_emission_factors

load_dotenv()


@lru_cache
def get_emissions_factors(
    path: str | None = None,
) -> EmissionFactors:
    if path is None:
        app_root = os.path.dirname(os.path.abspath(__file__))
        default_path = os.path.join(app_root, "data", "emissions_factors_nga_2024.json")
        path = os.getenv("CURRENT_EMISSION_FACTOR_CONFIG_FILE_PATH", default_path)
    return load_emission_factors(path)
