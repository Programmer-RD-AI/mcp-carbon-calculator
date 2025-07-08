import json
from pathlib import Path
from typing import Union

from src.models import EmissionFactors


def load_emission_factors(path: Union[str, Path]) -> EmissionFactors:
    content = Path(path).read_text()
    data = json.loads(content)
    return EmissionFactors(**data)
