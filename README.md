# Health Navigator

Health Navigator is a comprehensive healthcare platform featuring a robust backend for medical report processing, OCR, and biomarker extraction, alongside a modern, responsive frontend built with React.

## Project Structure

- **Frontend**: Vite, React, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend**: FastAPI, Python, Pinecone, EasyOCR, OpenAI, PyMuPDF.

## Prerequisites

- Node.js & npm
- Python 3.9+
- API Keys for OpenAI and Pinecone (configured in `backend/.env`)

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory, set up a virtual environment, install dependencies, and run the server:

```sh
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Run the FastAPI server:
python app/main.py
```
The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup

Open a new terminal, navigate to the project root, install Node dependencies, and start the development server:

```sh
# Ensure you are in the project root containing package.json
npm install

# Start the development server
npm run dev
```
The frontend application will be available at `http://localhost:8080` (or another port printed in your console).

## Key Features

- **Patient Dashboard**: View health trends, upload medical reports, and get AI-driven insights.
- **Diagnostic Center Portal**: Upload patient reports and manage biomarker data.
- **AI Analysis**: Backend utilizes a combination of OCR and vision-language models to extract biomarkers from uploaded medical reports.
- **Vector Search**: Pinecone integration for efficient similarity search and context retrieval.
