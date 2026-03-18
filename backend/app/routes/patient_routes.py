from fastapi import APIRouter
from app.services.mock_data_service import MockDataService
from pydantic import BaseModel
from typing import Optional

router = APIRouter(
    prefix="/api/patient",
    tags=["Patient"]
)

# Optional Schema for chatting
class ChatRequest(BaseModel):
    message: str
    reportContext: Optional[str] = None

@router.get("/dashboard")
async def get_patient_dashboard():
    return MockDataService.get_patient_dashboard_stats()

@router.get("/reports")
async def get_patient_reports():
    return MockDataService.get_patient_reports()

@router.get("/insights")
async def get_patient_insights():
    return MockDataService.get_patient_insights()

@router.get("/notifications")
async def get_patient_notifications():
    return MockDataService.get_patient_notifications()

@router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    # This is a stub for the future when we hook up OpenAI for a conversational UI.
    # We will simply return a mocked thoughtful response for now.
    user_msg = request.message.lower()
    reply = "I'm your AI health assistant. I can help interpret your reports and clarify your health data."
    
    if "cholesterol" in user_msg:
        reply = "Looking at your recent reports, your LDL cholesterol is slightly elevated. Consider reducing saturated fats in your diet."
    elif "sugar" in user_msg or "glucose" in user_msg:
        reply = "Your fasting glucose is in the prediabetic range. Increasing aerobic exercise can help improve insulin sensitivity."
        
    return {
        "reply": reply,
        "timestamp": "Just now"
    }

