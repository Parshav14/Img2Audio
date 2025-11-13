# Entry point for deployment
# This imports the FastAPI app from server.py to match deployment configuration
from server import app

# This allows the deployment command 'uvicorn main:app' to work
# while keeping the actual application logic in server.py

