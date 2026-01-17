from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

def build_faiss():
    """
    Build FAISS vector database from PDF documents in rag_docs directory
    """
    try:
        # Load documents from rag_docs directory
        loader = DirectoryLoader(
            "../rag_docs",
            glob="**/*.pdf",
            loader_cls=PyPDFLoader
        )
        docs = loader.load()
        
        if not docs:
            print("No PDF documents found in rag_docs directory")
            return None
        
        # Split documents into chunks
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=100
        )
        chunks = splitter.split_documents(docs)
        
        # Initialize embeddings
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # Create FAISS vector store
        db = FAISS.from_documents(chunks, embeddings)
        
        # Save to local storage
        db_path = "storage/vector_db"
        os.makedirs(db_path, exist_ok=True)
        db.save_local(db_path)
        
        print(f"FAISS database built successfully with {len(chunks)} chunks")
        return db
    except Exception as e:
        print(f"Error building FAISS database: {e}")
        return None

def load_rag():
    """
    Load existing FAISS vector database
    """
    try:
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        db_path = "storage/vector_db"
        
        if not os.path.exists(db_path):
            print("FAISS database not found. Building new database...")
            return build_faiss()
        
        db = FAISS.load_local(db_path, embeddings, allow_dangerous_deserialization=True)
        print("FAISS database loaded successfully")
        return db
    except Exception as e:
        print(f"Error loading FAISS database: {e}")
        # Try to build if load fails
        return build_faiss()

# Initialize RAG system
db = load_rag()

def rag_search(query: str, k: int = 4):
    """
    Search the RAG database for relevant documents
    """
    if db is None:
        return ["RAG system not initialized. Please build the database first."]
    
    try:
        results = db.similarity_search(query, k=k)
        return [doc.page_content for doc in results]
    except Exception as e:
        print(f"Error in RAG search: {e}")
        return [f"Error searching RAG database: {str(e)}"]
