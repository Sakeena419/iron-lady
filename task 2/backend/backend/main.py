from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from dotenv import load_dotenv
import os

from services.chatbot_service import ChatbotService
from services.knowledge_base import KnowledgeBase

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Iron Lady Learning Assistant API",
    description="AI-powered chatbot for Iron Lady programs and services",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
knowledge_base = KnowledgeBase()
chatbot_service = ChatbotService(knowledge_base)


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    message: str
    conversation_id: str
    suggestions: Optional[List[str]] = None


class QuickQuestionsResponse(BaseModel):
    questions: List[str]


@app.get("/")
async def root():
    return {
        "message": "Iron Lady Learning Assistant API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint - processes user messages and returns AI responses
    """
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        response = await chatbot_service.process_message(
            message=request.message,
            conversation_id=request.conversation_id
        )
        
        return ChatResponse(**response)
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/quick-questions", response_model=QuickQuestionsResponse)
async def get_quick_questions():
    """
    Returns a list of quick question suggestions
    """
    questions = [
        "What programs do you offer?",
        "How do I enroll in a course?",
        "What are the prerequisites for leadership training?",
        "Can you tell me about the course schedule?",
        "What is the cost of your programs?",
        "Do you offer any scholarships or financial aid?",
        "How long are the programs?",
        "What certifications will I receive?",
    ]
    return QuickQuestionsResponse(questions=questions)


@app.get("/api/programs")
async def get_programs():
    """
    Returns information about available programs
    """
    return {
        "programs": knowledge_base.get_programs_info()
    }


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
