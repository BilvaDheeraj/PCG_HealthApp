import sys
import os

# Add the parent directory (backend) to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.report_routes import router as report_router
from app.routes.patient_routes import router as patient_router
from app.routes.diagnostic_routes import router as diagnostic_router
from app.routes.admin_routes import router as admin_router
from app.routes.biomarker_routes import router as biomarker_router
from app.core.config import settings

# Initialize FastAPI app
app = FastAPI(
    title="Health Navigator Backend Server",
    description="Backend API for medical report processing, OCR, and biomarker extraction.",
    version="1.0.0"
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,  # Allows localhost:8080 and localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include Routers
app.include_router(report_router)
app.include_router(patient_router)
app.include_router(diagnostic_router)
app.include_router(admin_router)
app.include_router(biomarker_router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Health Navigator API is running."}

if __name__ == "__main__":
    import uvicorn
    # When running directly `python main.py`
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
