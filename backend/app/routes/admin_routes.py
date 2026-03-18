from fastapi import APIRouter
from app.services.mock_data_service import MockDataService

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)

@router.get("/dashboard")
async def get_admin_dashboard():
    return MockDataService.get_admin_dashboard_stats()

@router.get("/users")
async def get_admin_users():
    return MockDataService.get_admin_users()

@router.get("/notifications")
async def get_admin_notifications():
    return MockDataService.get_admin_notifications()

