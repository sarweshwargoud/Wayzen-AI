from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    """
    Initialize and return Groq LLM
    """
    api_key = os.getenv("GROQ_API_KEY")
    
    if not api_key:
        print("Warning: GROQ_API_KEY not found. LLM will not be available.")
        return None
    
    try:
        llm = ChatGroq(
            model="llama3-70b-8192",
            groq_api_key=api_key,
            temperature=0.7
        )
        print("Groq LLM initialized successfully")
        return llm
    except Exception as e:
        print(f"Error initializing Groq LLM: {e}")
        return None

# Initialize LLM
llm = get_llm()

