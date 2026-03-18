import fitz  # PyMuPDF
from PIL import Image
import easyocr
import io

class OCRService:
    @staticmethod
    def extract_text_from_pdf(file_bytes: bytes) -> str:
        """
        Extracts text from a PDF file using PyMuPDF.
        """
        text = ""
        try:
            # Open the PDF from bytes
            pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
            for page_num in range(len(pdf_document)):
                page = pdf_document.load_page(page_num)
                text += page.get_text()
            pdf_document.close()
            return text.strip()
        except Exception as e:
            raise RuntimeError(f"Failed to extract text from PDF: {str(e)}")

    @staticmethod
    def extract_text_from_image(file_bytes: bytes) -> str:
        """
        Extracts text from an image file using easyocr.
        """
        try:
            # Initialize the reader (it will download models on first run)
            reader = easyocr.Reader(['en'], gpu=False) 
            
            # easyocr can read directly from bytes
            result = reader.readtext(file_bytes, detail=0)
            
            # Join the extracted text pieces
            text = " ".join(result)
            return text.strip()
        except Exception as e:
            raise RuntimeError(f"Failed to extract text from image: {str(e)}")
