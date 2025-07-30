import json
from pathlib import Path

from src.models import EmissionFactors


def load_emission_factors(path: str | Path) -> EmissionFactors:
    content = Path(path).read_text()
    data = json.loads(content)
    return EmissionFactors(**data)
