import os
from functools import lru_cache

from dotenv import load_dotenv
from models import EmissionFactors
from utils import load_emission_factors

load_dotenv()


@lru_cache
def get_emissions_factors(
    path: str = None,
) -> EmissionFactors:
    if path is None:
        path = os.getenv("CURRENT_EMISSION_FACTOR_CONFIG_FILE_PATH", "data/emissions_factors_nga_2024.json")
    return load_emission_factors(path)
