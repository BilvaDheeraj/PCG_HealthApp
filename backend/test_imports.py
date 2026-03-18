import sys
import os

print("--- Starting Validation ---")

try:
    # 1. Check Configuration
    print("Testing config imports...")
    from app.core.config import settings
    print(f"CORS ORIGINS configured: {len(settings.CORS_ORIGINS)}")
    
    # 2. Check Schemas
    print("Testing schema imports...")
    from app.models.schema import ReportResponse, Biomarker, ErrorResponse
    
    # 3. Check Services
    print("Testing OCR service imports...")
    from app.services.ocr_service import OCRService
    
    print("Testing OpenAI service imports...")
    from app.services.openai_service import OpenAIService, client
    if not client.api_key:
        print("WARNING: OpenAI API key is missing or not loaded.")
        
    print("Testing Pinecone service imports...")
    from app.services.pinecone_service import PineconeService, pc
    if not pc.config.api_key:
        print("WARNING: Pinecone API key is missing or not loaded.")
        
    print("Testing File service imports...")
    from app.services.file_service import FileService
    
    # 4. Check Routes
    print("Testing Routes imports...")
    from app.routes.report_routes import router
    
    # 5. Check Main app
    print("Testing Main App imports...")
    from app.main import app
    print(f"FastAPI app initialized with {len(app.routes)} routes.")

    print("--- Validation Successful ---")
    sys.exit(0)
except Exception as e:
    import traceback
    print(f"--- Validation Failed ---")
    traceback.print_exc()
    sys.exit(1)
