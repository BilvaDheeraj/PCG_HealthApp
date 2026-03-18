from fastapi import APIRouter
from app.services.mock_data_service import MockDataService

router = APIRouter(
    prefix="/api/biomarkers",
    tags=["Biomarkers"]
)

@router.get("/")
async def get_biomarkers():
    return MockDataService.get_biomarkers()
