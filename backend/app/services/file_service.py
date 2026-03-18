from fastapi import UploadFile, HTTPException
from typing import Dict, Any
from app.services.ocr_service import OCRService
from app.services.openai_service import OpenAIService
from app.services.pinecone_service import PineconeService
import json

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

class FileService:
    @staticmethod
    async def process_report(file: UploadFile) -> Dict[str, Any]:
        """
        Main orchestration function to process an uploaded medical report.
        """
        # 1. Validation
        ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}. Allowed: {ALLOWED_EXTENSIONS}")
            
        file_bytes = await file.read()
        if len(file_bytes) > MAX_FILE_SIZE:
             raise HTTPException(status_code=400, detail="File too large. Maximum size is 10MB.")

        # 2. Extract Text
        extracted_text = ""
        try:
            if ext == "pdf":
                extracted_text = OCRService.extract_text_from_pdf(file_bytes)
            else:
                extracted_text = OCRService.extract_text_from_image(file_bytes)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

        if not extracted_text:
             raise HTTPException(status_code=400, detail="Could not extract any text from the uploaded file. It might be empty or corrupted.")

        # 3. Extract Biomarkers using OpenAI
        biomarkers = []
        try:
            biomarkers = OpenAIService.extract_biomarkers(extracted_text)
        except Exception as e:
             raise HTTPException(status_code=500, detail=f"Biomarker extraction failed: {str(e)}")

        # 4. Generate Embeddings and Store in Pinecone
        pinecone_id = None
        try:
            metadata = {
                "file_name": file.filename,
                "biomarkers": json.dumps(biomarkers) # Store as string representation of JSON
            }
            pinecone_id = PineconeService.store_report_embedding(
                text=extracted_text, 
                metadata=metadata
            )
        except Exception as e:
             # We log the error but don't fail the whole request if Pinecone fails, 
             # as the primary goal (extraction) succeeded.
             print(f"Warning: Pinecone storage failed: {str(e)}")

        # 5. Return Structured Response
        return {
            "file_name": file.filename,
            "text_extracted": True,
            "biomarkers": biomarkers,
            "pinecone_id": pinecone_id,
            "message": "Report processed successfully"
        }
