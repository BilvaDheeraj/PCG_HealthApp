import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT", "us-east-1")
    
    # Frontend URLs for CORS
    CORS_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:3000",
        # Add production URLs here later
    ]

settings = Settings()
