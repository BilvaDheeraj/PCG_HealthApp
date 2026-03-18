from fastapi import APIRouter, File, UploadFile, HTTPException
from app.models.schema import ReportResponse, ErrorResponse
from app.services.file_service import FileService

router = APIRouter(
    prefix="/api",
    tags=["Reports"]
)

@router.post(
    "/upload-report", 
    response_model=ReportResponse,
    responses={
        400: {"model": ErrorResponse, "description": "Bad Request"},
        500: {"model": ErrorResponse, "description": "Internal Server Error"}
    }
)
async def upload_report(file: UploadFile = File(...)):
    """
    Uploads a medical report (PDF/Image), extracts text using OCR, 
    identifies biomarkers using OpenAI, and stores embeddings in Pinecone.
    """
    try:
        result = await FileService.process_report(file)
        return ReportResponse(**result)
    except HTTPException as e:
        # Re-raise FastAPI HTTPExceptions
        raise e
    except Exception as e:
        # Catch unexpected errors
        raise HTTPException(status_code=500, detail=str(e))
