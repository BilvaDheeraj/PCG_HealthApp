import sys
import traceback

try:
    from app.services.pinecone_service import pc
    print("Pinecone imported successfully")
except Exception as e:
    with open("pinecone_error.txt", "w") as f:
        f.write(traceback.format_exc())
    print("Logged to pinecone_error.txt")
