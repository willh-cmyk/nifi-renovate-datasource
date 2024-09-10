import re

import httpx
from bs4 import BeautifulSoup
from fastapi import HTTPException


async def fetch_nifi_versions(url: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        versions = set()
        for link in soup.find_all("a", href=True):
            version_text = link["href"].strip()
            match = re.match(r"^(\d+\.\d+\.\d+)/$", version_text)
            if match:
                version = match.group(1)
                versions.add(version)

        if not versions:
            raise HTTPException(status_code=404, detail="Unable to find any versions.")

        return sorted(versions)

    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=str(e))
