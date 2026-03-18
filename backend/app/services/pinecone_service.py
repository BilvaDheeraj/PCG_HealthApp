from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import uuid
from app.core.config import settings

# Initialize Clients
pc = Pinecone(api_key=settings.PINECONE_API_KEY)
openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)

INDEX_NAME = "health-reports"

class PineconeService:
    @staticmethod
    def initialize_index():
        """
        Creates the 'health-reports' index in Pinecone if it doesn't exist.
        """
        if INDEX_NAME not in pc.list_indexes().names():
            print(f"Creating Pinecone index '{INDEX_NAME}'...")
            pc.create_index(
                name=INDEX_NAME,
                dimension=1536, # Dimension for text-embedding-3-small
                metric='cosine',
                spec=ServerlessSpec(
                    cloud='aws',
                    region=settings.PINECONE_ENVIRONMENT
                )
            )
            print(f"Index '{INDEX_NAME}' created successfully.")
        else:
            print(f"Index '{INDEX_NAME}' already exists.")
            
    @staticmethod
    def get_embedding(text: str) -> list[float]:
        """
        Generates OpenAI embeddings for the given text.
        """
        try:
            response = openai_client.embeddings.create(
                model="text-embedding-3-small",
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            raise RuntimeError(f"Failed to generate embedding: {str(e)}")

    @staticmethod
    def store_report_embedding(text: str, metadata: dict) -> str:
        """
        Embeds the text and stores it in Pinecone with associated metadata.
        Returns the unique vector ID.
        """
        try:
            # 1. Ensure Index Exists (can be optimized to only run once on startup)
            PineconeService.initialize_index()
            
            # 2. Generate Embedding
            embedding = PineconeService.get_embedding(text)
            
            # 3. Connect to Index and Upsert
            index = pc.Index(INDEX_NAME)
            vector_id = str(uuid.uuid4())
            
            # Pinecone requires metadata values to be strings, numbers, booleans, or lists of strings.
            # Convert any complex objects in metadata to strings if needed.
            clean_metadata = {}
            for k, v in metadata.items():
                if isinstance(v, (dict, list)):
                    clean_metadata[k] = str(v)
                else:
                    clean_metadata[k] = v
                    
            # Add raw text snippet to metadata for easy retrieval
            clean_metadata["text_snippet"] = text[:500] 
            
            index.upsert(
                vectors=[
                    {
                        "id": vector_id,
                        "values": embedding,
                        "metadata": clean_metadata
                    }
                ]
            )
            
            return vector_id
        except Exception as e:
            raise RuntimeError(f"Failed to store embedding in Pinecone: {str(e)}")
