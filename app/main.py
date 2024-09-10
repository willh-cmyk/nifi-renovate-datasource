# app/main.py
from fastapi import FastAPI

from .routes.versions import router as versions_router

app = FastAPI()

# Include routers
app.include_router(versions_router)
