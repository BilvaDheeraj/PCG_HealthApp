from openai import OpenAI
import json
from typing import List, Dict
from app.core.config import settings

# Initialize OpenAI Client
client = OpenAI(api_key=settings.OPENAI_API_KEY)

class OpenAIService:
    @staticmethod
    def extract_biomarkers(text: str) -> List[Dict]:
        """
        Calls OpenAI gpt-4o-mini to extract structured biomarkers from raw text.
        Expects a JSON array response.
        """
        if not text or not text.strip():
            return []

        prompt = f"""
        You are an expert medical AI assistant. Extract health biomarkers and lab results from the following medical report text.
        
        Return the information strictly as a JSON array of objects, where each object has the following keys:
        - "name": The name of the biomarker (e.g., "Hemoglobin", "Cholesterol").
        - "value": The measured numerical or qualitative value.
        - "unit": The unit of measurement if provided (e.g., "mg/dL"), otherwise null.
        - "reference_range": The healthy or reference range if provided in the text, otherwise null.
        - "status": The status if indicated or inferred (e.g., "Normal", "High", "Low"), otherwise null.
        
        Only return the raw JSON array. Do not include markdown code blocks like ```json ... ```. Do not include any other text.
        
        MEDICAL REPORT TEXT:
        {text}
        """

        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a precise medical data extraction tool."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.0,
                max_tokens=2000,
            )
            
            content = response.choices[0].message.content.strip()
            
            # Clean up potential markdown formatting if the model still outputs it
            if content.startswith("```json"):
                content = content[7:]
            if content.startswith("```"):
                content = content[3:]
            if content.endswith("```"):
                content = content[:-3]
                
            biomarkers = json.loads(content.strip())
            return biomarkers
            
        except json.JSONDecodeError as e:
            raise RuntimeError(f"OpenAI returned malformed JSON: {str(e)}\nRaw Response: {content}")
        except Exception as e:
            raise RuntimeError(f"Failed to communicate with OpenAI API: {str(e)}")
