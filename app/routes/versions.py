# app/routes/versions.py
from fastapi import APIRouter

from app.models import VersionResponse
from app.services import fetch_versions

router = APIRouter()


@router.get("/versions", response_model=VersionResponse)
async def get_versions():
    url = "https://archive.apache.org/dist/nifi/"
    versions = await fetch_versions(url)
    return {"releases": [{"version": version} for version in versions]}
