from fastapi import FastAPI

from app.routes.nifi import router as nifi_router

app = FastAPI()

# Include routers for different datasources
app.include_router(nifi_router)
