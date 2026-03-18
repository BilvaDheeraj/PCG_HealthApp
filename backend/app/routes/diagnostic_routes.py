from fastapi import APIRouter
from app.services.mock_data_service import MockDataService

router = APIRouter(
    prefix="/api/diagnostic",
    tags=["Diagnostic"]
)

@router.get("/dashboard")
async def get_diagnostic_dashboard():
    return MockDataService.get_diagnostic_dashboard_stats()

@router.get("/patients")
async def get_diagnostic_patients():
    return MockDataService.get_diagnostic_patients()

@router.get("/reports")
async def get_diagnostic_reports():
    return MockDataService.get_diagnostic_reports()

@router.get("/bookings")
async def get_diagnostic_bookings():
    return MockDataService.get_diagnostic_bookings()

@router.get("/notifications")
async def get_diagnostic_notifications():
    return MockDataService.get_diagnostic_notifications()
