import json
from functools import lru_cache
from pathlib import Path

from models import EmissionFactors


@lru_cache
def load_emission_factors(path: str | Path) -> EmissionFactors:
    content = Path(path).read_text()
    data = json.loads(content)
    return EmissionFactors(**data)
