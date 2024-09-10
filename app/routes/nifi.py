from fastapi import APIRouter

from app.datasources.nifi import fetch_nifi_versions
from app.models import VersionResponse

router = APIRouter()


@router.get("/nifi/versions", response_model=VersionResponse)
async def get_nifi_versions():
    url = "https://archive.apache.org/dist/nifi/"
    versions = await fetch_nifi_versions(url)
    return {"releases": [{"version": version} for version in versions]}
