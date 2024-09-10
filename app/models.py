# app/models.py
from typing import List

from pydantic import BaseModel


class VersionResponse(BaseModel):
    releases: List[dict]
