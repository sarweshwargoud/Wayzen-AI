from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from database import engine, Base
from routes import auth_routes, chat_routes

load_dotenv()

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="WayGen AI Career Reality Checker")

# CORS Middleware to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(chat_routes.router, prefix="/api/chat", tags=["chat"])

@app.get("/")
async def read_root():
    return {"message": "Welcome to WayGen AI Backend API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
