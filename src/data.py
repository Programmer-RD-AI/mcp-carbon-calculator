from functools import lru_cache

from src.config import CURRENT_EMISSION_FACTOR_CONFIG_FILE_PATH
from src.models import EmissionFactors
from src.utils import load_emission_factors


@lru_cache
def get_emissions_factors(
    path: str = CURRENT_EMISSION_FACTOR_CONFIG_FILE_PATH,
) -> EmissionFactors:
    return load_emission_factors(path)
