from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import ChatSession, Message, User
from pydantic import BaseModel
from typing import List, Optional
from ai.agent import run_agent

router = APIRouter()

class MessageCreate(BaseModel):
    content: str
    session_id: Optional[int] = None
    # Guest profile fields (optional, used when user is not logged in)
    country: Optional[str] = None
    education: Optional[str] = None
    interest: Optional[str] = None
    budget: Optional[str] = None
    time_available: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: int

def build_context_prompt(user_message: str, user_profile: Optional[dict] = None):
    """
    Build context-aware prompt with user profile information
    """
    if user_profile:
        context = f"""
User profile:
Country: {user_profile.get('country', 'Not specified')}
Education: {user_profile.get('education', 'Not specified')}
Interest: {user_profile.get('interest', 'Not specified')}
Budget: {user_profile.get('budget', 'Not specified')}
Time Available: {user_profile.get('time_available', 'Not specified')}

Question: {user_message}

Please provide personalized career guidance based on the user's profile and use the available tools (CareerDocs and WebSearch) to get accurate, up-to-date information.
"""
    else:
        context = f"""
Question: {user_message}

Please provide career guidance using the available tools (CareerDocs and WebSearch) to get accurate, up-to-date information.
"""
    
    return context

@router.post("", response_model=ChatResponse)
def chat(msg: MessageCreate, db: Session = Depends(get_db), user_id: Optional[int] = None):
    """
    Handle chat messages with AI agent integration
    For logged-in users: user_id is passed, profile is read from database
    For guests: profile fields are passed in the request body
    """
    # 1. Retrieve or Create Session
    if msg.session_id:
        session = db.query(ChatSession).filter(ChatSession.id == msg.session_id).first()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        # Create new session
        # For logged-in users, use user_id; for guests, use None
        session = ChatSession(user_id=user_id, title="New Conversation")
        db.add(session)
        db.commit()
        db.refresh(session)

    # 2. Build user profile context
    user_profile = None
    
    if user_id:
        # Logged-in user: get profile from database
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            # Assuming user has profile fields - adjust based on your User model
            user_profile = {
                "country": getattr(user, 'country', None),
                "education": getattr(user, 'education', None),
                "interest": getattr(user, 'interest', None),
                "budget": getattr(user, 'budget', None),
                "time_available": getattr(user, 'time_available', None)
            }
    else:
        # Guest user: use profile from request
        if msg.country or msg.education or msg.interest:
            user_profile = {
                "country": msg.country,
                "education": msg.education,
                "interest": msg.interest,
                "budget": msg.budget,
                "time_available": msg.time_available
            }

    # 3. Save User Message
    user_message = Message(session_id=session.id, role="user", content=msg.content)
    db.add(user_message)
    db.flush()  # Flush to get message ID if needed

    # 4. Generate AI Response using Agent
    try:
        # Build context-aware prompt
        prompt = build_context_prompt(msg.content, user_profile)
        
        # Run agent
        ai_text = run_agent(prompt)
        
        # Fallback if agent returns error message
        if not ai_text or "not available" in ai_text.lower() or "error" in ai_text.lower():
            ai_text = f"Hello! I received your message: '{msg.content}'. I'm your Career AI Agent. My advanced reasoning engine is currently being configured. Please ensure GROQ_API_KEY is set in your environment variables."
    except Exception as e:
        print(f"Error in agent processing: {e}")
        import traceback
        traceback.print_exc()
        ai_text = f"Hello! I received your message: '{msg.content}'. I encountered an error: {str(e)}. Please check the backend logs for more details."

    # 5. Save AI Message
    ai_message = Message(session_id=session.id, role="ai", content=ai_text)
    db.add(ai_message)
    db.commit()

    return {"response": ai_text, "session_id": session.id}

@router.get("/history/{session_id}")
def get_history(session_id: int, db: Session = Depends(get_db)):
    """
    Get chat history for a session
    """
    messages = db.query(Message).filter(Message.session_id == session_id).order_by(Message.timestamp).all()
    return [
        {
            "id": msg.id,
            "role": msg.role,
            "content": msg.content,
            "timestamp": msg.timestamp.isoformat() if msg.timestamp else None
        }
        for msg in messages
    ]

@router.get("/sessions")
def get_sessions(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    """
    Get all chat sessions for a user
    """
    if user_id:
        sessions = db.query(ChatSession).filter(ChatSession.user_id == user_id).order_by(ChatSession.created_at.desc()).all()
    else:
        # For guests, return empty or handle differently
        sessions = []
    
    return [
        {
            "id": session.id,
            "title": session.title,
            "created_at": session.created_at.isoformat() if session.created_at else None
        }
        for session in sessions
    ]
