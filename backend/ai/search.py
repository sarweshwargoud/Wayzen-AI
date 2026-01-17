from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_search_client():
    """
    Initialize and return Tavily search client
    """
    api_key = os.getenv("TAVILY_API_KEY")
    
    if not api_key:
        print("Warning: TAVILY_API_KEY not found. Web search will not be available.")
        return None
    
    try:
        client = TavilyClient(api_key=api_key)
        print("Tavily search client initialized successfully")
        return client
    except Exception as e:
        print(f"Error initializing Tavily client: {e}")
        return None

# Initialize search client
search_client = get_search_client()

def web_search(query: str):
    """
    Search the web using Tavily API
    """
    if search_client is None:
        return {
            "error": "Tavily API key not configured",
            "results": []
        }
    
    try:
        response = search_client.search(
            query=query,
            search_depth="advanced",
            max_results=5
        )
        
        # Format results
        results = []
        if "results" in response:
            for result in response["results"]:
                results.append({
                    "title": result.get("title", ""),
                    "url": result.get("url", ""),
                    "content": result.get("content", "")
                })
        
        return {
            "query": query,
            "results": results
        }
    except Exception as e:
        print(f"Error in web search: {e}")
        return {
            "error": str(e),
            "results": []
        }

