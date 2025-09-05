import os

from dotenv import load_dotenv

from src.models import EmissionFactors
from src.utils import load_emission_factors

load_dotenv()

_cached_emission_factors: EmissionFactors | None = None


def get_emissions_factors(
    path: str | None = None,
) -> EmissionFactors:
    global _cached_emission_factors

    if _cached_emission_factors is not None:
        return _cached_emission_factors

    if path is None:
        app_root = os.path.dirname(os.path.abspath(__file__))
        default_path = os.path.join(app_root, "data", "emissions_factors_nga_2024.json")
        path = os.getenv("CURRENT_EMISSION_FACTOR_CONFIG_FILE_PATH", default_path)

    _cached_emission_factors = load_emission_factors(path)
    return _cached_emission_factors
