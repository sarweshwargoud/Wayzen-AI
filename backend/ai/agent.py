from langchain.agents import initialize_agent, Tool
from langchain.agents import AgentType
import os

# Import dependencies
from .llm import llm
from .rag import rag_search
from .search import web_search

def create_agent():
    """
    Create LangChain agent with RAG and Web Search tools
    """
    if llm is None:
        print("LLM not available. Agent cannot be created.")
        return None
    
    # Define tools
    tools = [
        Tool(
            name="CareerDocs",
            func=lambda q: "\n\n".join(rag_search(q, k=4)),
            description="Search career reports, salary data, automation risks, and job market trends from our knowledge base. Use this for specific career-related questions."
        ),
        Tool(
            name="WebSearch",
            func=lambda q: str(web_search(q)),
            description="Search the live web for current job market data, recent salary trends, and real-time career information. Use this for up-to-date information."
        )
    ]
    
    try:
        agent = initialize_agent(
            tools=tools,
            llm=llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True
        )
        print("Agent initialized successfully")
        return agent
    except Exception as e:
        print(f"Error creating agent: {e}")
        return None

# Initialize agent
agent = create_agent()

def run_agent(prompt: str):
    """
    Run the agent with a given prompt
    """
    if agent is None:
        return "Agent not available. Please configure GROQ_API_KEY to enable AI responses."
    
    try:
        response = agent.run(prompt)
        return response
    except Exception as e:
        print(f"Error running agent: {e}")
        return f"I encountered an error processing your request: {str(e)}"
