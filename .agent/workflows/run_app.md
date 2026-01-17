---
description: Run the NextGen AI Application
---

# Run NextGen AI

This workflow will help you start both the frontend and backend servers.

## Prerequisites

- Node.js installed
- Python installed
- Virtual environment set up (optional but recommended for backend)

## Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:
   ```bash
   python main.py
   ```
   The backend will start on `http://localhost:8000`

## Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`
