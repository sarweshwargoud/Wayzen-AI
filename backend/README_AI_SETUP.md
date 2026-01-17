# WayGen AI Integration Setup Guide

This document explains how to set up and configure the AI integration for WayGen AI.

## 🧠 Architecture Overview

```
React Chat UI
      ↓
FastAPI /api/chat
      ↓
Context Builder
      ↓
Agent Controller
      ↓
┌───────────────┐
│  GROQ LLaMA-3 │
└───────────────┘
      ↑
RAG (FAISS) ← Career Docs
      ↑
Search API (Tavily)
```

## 📋 Prerequisites

1. **Python 3.8+**
2. **API Keys:**
   - GROQ_API_KEY (from https://console.groq.com)
   - TAVILY_API_KEY (from https://tavily.com)

## 🔧 Installation

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Create a `.env` file in the `backend` directory:
```env
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

## 📚 Building the RAG Database

1. Place your PDF documents in the `rag_docs` directory (or update the path in `rag.py`)

2. Build the FAISS vector database:
```python
from ai.rag import build_faiss
build_faiss()
```

Or run it programmatically:
```bash
cd backend
python -c "from ai.rag import build_faiss; build_faiss()"
```

The database will be saved to `backend/storage/vector_db/`

## 🚀 Running the Application

1. **Start the backend:**
```bash
cd backend
python main.py
```

2. **Start the frontend:**
```bash
cd frontend
npm run dev
```

## 🔌 API Endpoints

### POST `/api/chat`
Send a chat message to the AI agent.

**Request Body:**
```json
{
  "content": "I want to become an AI Engineer",
  "session_id": 1,  // Optional
  "country": "India",  // Optional (for guests)
  "education": "Graduate",  // Optional (for guests)
  "interest": "AI/ML",  // Optional (for guests)
  "budget": "Medium",  // Optional (for guests)
  "time_available": "10h"  // Optional (for guests)
}
```

**Response:**
```json
{
  "response": "Based on India job data and AI demand...",
  "session_id": 1
}
```

### GET `/api/history/{session_id}`
Get chat history for a session.

### GET `/api/sessions`
Get all chat sessions for a user.

## 🧩 Components

### 1. RAG System (`ai/rag.py`)
- Uses FAISS for vector storage
- Uses HuggingFace embeddings (all-MiniLM-L6-v2)
- Loads PDFs from `rag_docs` directory
- Provides similarity search functionality

### 2. LLM (`ai/llm.py`)
- Groq LLaMA-3 70B model
- Configured via `GROQ_API_KEY`

### 3. Search (`ai/search.py`)
- Tavily web search API
- Configured via `TAVILY_API_KEY`
- Provides real-time web search

### 4. Agent (`ai/agent.py`)
- LangChain agent with two tools:
  - **CareerDocs**: RAG search from knowledge base
  - **WebSearch**: Live web search via Tavily
- Uses zero-shot-react-description agent type

### 5. Chat Routes (`routes/chat_routes.py`)
- Handles chat requests
- Builds context from user profile (logged-in) or guest data
- Integrates with agent for AI responses

## 👤 User Types

### Guest Users
- Provide profile data via request body:
  - Country
  - Education
  - Interest
  - Budget
  - Time Available
- Profile data is sent with each message

### Logged-in Users
- Profile is automatically read from database
- No need to send profile data with each message
- AI uses saved profile automatically

## 🔍 Troubleshooting

1. **"Agent not available" error:**
   - Check that `GROQ_API_KEY` is set in `.env`
   - Verify the API key is valid

2. **"RAG system not initialized" error:**
   - Build the FAISS database first
   - Ensure PDFs are in `rag_docs` directory

3. **"Tavily API key not configured" warning:**
   - Web search will be disabled
   - Set `TAVILY_API_KEY` in `.env` to enable

4. **Import errors:**
   - Make sure all dependencies are installed: `pip install -r requirements.txt`
   - Check Python version (3.8+)

## 📝 Notes

- The agent uses both RAG (for career docs) and web search (for live data)
- User context is automatically injected into prompts
- All chat messages are saved to the database
- Sessions are created automatically for new conversations

