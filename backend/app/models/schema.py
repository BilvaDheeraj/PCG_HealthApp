from pydantic import BaseModel, Field
from typing import List, Optional

class Biomarker(BaseModel):
    """
    Represents a single biomarker extracted from a medical report.
    """
    name: str = Field(..., description="Name of the biomarker, e.g., 'Hemoglobin'")
    value: str = Field(..., description="The measured value of the biomarker")
    unit: Optional[str] = Field(None, description="The unit of measurement, e.g., 'g/dL'")
    reference_range: Optional[str] = Field(None, description="The healthy/reference range")
    status: Optional[str] = Field(None, description="Clinical status, e.g., 'Normal', 'High', 'Low'")

class ReportResponse(BaseModel):
    """
    Response model for the /upload-report endpoint.
    """
    file_name: str
    text_extracted: bool
    biomarkers: List[Biomarker]
    pinecone_id: Optional[str] = None
    message: str = "Report processed successfully"
    
class ErrorResponse(BaseModel):
    """
    Standardized error response.
    """
    detail: str
