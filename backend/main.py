"""
FastAPI backend for AI Wiki Quiz Generator.
"""

import json
import logging
from typing import List
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import desc

from database import init_db, get_db, Quiz
from models import (
    GenerateQuizRequest,
    QuizHistoryItem,
    QuizDetailResponse,
    ErrorResponse,
)
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Wiki Quiz Generator API",
    description="Transform Wikipedia articles into engaging quizzes using AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    try:
        init_db()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")
        raise


@app.get("/", tags=["Health"])
async def root():
    """
    Root endpoint for health check.
    """
    return {
        "message": "AI Wiki Quiz Generator API",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.post("/generate_quiz", tags=["Quiz Generation"])
async def generate_quiz_endpoint(
    request: GenerateQuizRequest,
    db: Session = Depends(get_db)
):
    """
    Generate a quiz from a Wikipedia article URL.
    
    **Process Flow:**
    1. Validate and scrape the Wikipedia URL
    2. Clean the content
    3. Use LLM to generate quiz and extract information
    4. Store results in database
    5. Return generated quiz
    
    **Args:**
    - url: Wikipedia article URL (e.g., https://en.wikipedia.org/wiki/Alan_Turing)
    
    **Returns:**
    - JSON object with quiz data including questions, entities, and related topics
    
    **Error Handling:**
    - 400: Invalid URL or content extraction failed
    - 500: LLM processing error or database error
    """
    
    try:
        logger.info(f"Received quiz generation request for: {request.url}")
        
        # Step 1: Scrape Wikipedia
        logger.info("Step 1: Scraping Wikipedia...")
        cleaned_content, article_title, raw_html = scrape_wikipedia(request.url)
        logger.info(f"Successfully scraped: {article_title}")
        
        # Step 2: Generate quiz using LLM
        logger.info("Step 2: Generating quiz with LLM...")
        quiz_data = generate_quiz(cleaned_content, article_title)
        logger.info("Successfully generated quiz")
        
        # Step 3: Save to database
        logger.info("Step 3: Saving to database...")
        quiz_record = Quiz(
            url=request.url,
            title=quiz_data.get("title", article_title),
            date_generated=datetime.utcnow(),
            scraped_content=raw_html,  # Bonus: store raw HTML
            full_quiz_data=json.dumps(quiz_data)  # Serialize quiz data
        )
        db.add(quiz_record)
        db.commit()
        db.refresh(quiz_record)
        logger.info(f"Quiz saved with ID: {quiz_record.id}")
        
        # Return the generated quiz with metadata
        response = {
            "id": quiz_record.id,
            "url": request.url,
            **quiz_data
        }
        
        return response
        
    except ValueError as e:
        logger.warning(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error generating quiz: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate quiz: {str(e)}"
        )


@app.get("/history", response_model=List[QuizHistoryItem], tags=["History"])
async def get_history(
    db: Session = Depends(get_db),
    limit: int = 100,
    offset: int = 0
):
    """
    Get list of all previously generated quizzes.
    
    **Args:**
    - limit: Maximum number of results (default: 100)
    - offset: Number of results to skip (default: 0)
    
    **Returns:**
    - List of quiz history items with id, url, title, and date_generated
    
    **Error Handling:**
    - 500: Database query error
    """
    
    try:
        logger.info(f"Fetching history (limit={limit}, offset={offset})")
        
        # Query recent quizzes, ordered by date descending
        quizzes = db.query(Quiz).order_by(
            desc(Quiz.date_generated)
        ).offset(offset).limit(limit).all()
        
        logger.info(f"Found {len(quizzes)} quizzes")
        
        # Convert to response model
        history_items = [
            QuizHistoryItem(
                id=quiz.id,
                url=quiz.url,
                title=quiz.title,
                date_generated=quiz.date_generated
            )
            for quiz in quizzes
        ]
        
        return history_items
        
    except Exception as e:
        logger.error(f"Error fetching history: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch history"
        )


@app.get("/quiz/{quiz_id}", response_model=QuizDetailResponse, tags=["History"])
async def get_quiz_detail(
    quiz_id: int,
    db: Session = Depends(get_db)
):
    """
    Get detailed quiz data by ID.
    
    **Process Flow:**
    1. Query database for quiz by ID
    2. Deserialize JSON quiz data
    3. Return with all details
    
    **Args:**
    - quiz_id: The ID of the quiz to retrieve
    
    **Returns:**
    - Complete quiz object with all questions and metadata
    
    **Error Handling:**
    - 404: Quiz not found
    - 500: Database or deserialization error
    """
    
    try:
        logger.info(f"Fetching quiz details for ID: {quiz_id}")
        
        # Query quiz by ID
        quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
        
        if not quiz:
            logger.warning(f"Quiz not found: ID {quiz_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Quiz with ID {quiz_id} not found"
            )
        
        # Deserialize quiz data
        quiz_data = json.loads(quiz.full_quiz_data)
        
        # Build response
        response = QuizDetailResponse(
            id=quiz.id,
            url=quiz.url,
            title=quiz.title,
            date_generated=quiz.date_generated,
            summary=quiz_data.get("summary"),
            key_entities=quiz_data.get("key_entities"),
            sections=quiz_data.get("sections"),
            quiz=quiz_data.get("quiz", []),
            related_topics=quiz_data.get("related_topics")
        )
        
        logger.info(f"Successfully retrieved quiz {quiz_id}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching quiz detail: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch quiz details"
        )


@app.get("/health", tags=["Health"])
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint with database connectivity test.
    
    **Returns:**
    - Status and timestamp
    """
    
    try:
        # Test database connection
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        db_status = "disconnected"
    
    return {
        "status": "healthy" if db_status == "connected" else "unhealthy",
        "database": db_status,
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/stats", tags=["Statistics"])
async def get_stats(db: Session = Depends(get_db)):
    """
    Get statistics about generated quizzes.
    
    **Returns:**
    - Total quizzes, total questions, date range, etc.
    """
    
    try:
        total_quizzes = db.query(Quiz).count()
        
        if total_quizzes == 0:
            return {
                "total_quizzes": 0,
                "total_questions": 0,
                "first_quiz_date": None,
                "last_quiz_date": None
            }
        
        # Get date range
        first_quiz = db.query(Quiz).order_by(Quiz.date_generated).first()
        last_quiz = db.query(Quiz).order_by(desc(Quiz.date_generated)).first()
        
        # Calculate total questions
        total_questions = 0
        for quiz in db.query(Quiz).all():
            try:
                quiz_data = json.loads(quiz.full_quiz_data)
                total_questions += len(quiz_data.get("quiz", []))
            except:
                pass
        
        return {
            "total_quizzes": total_quizzes,
            "total_questions": total_questions,
            "first_quiz_date": first_quiz.date_generated if first_quiz else None,
            "last_quiz_date": last_quiz.date_generated if last_quiz else None,
            "average_questions_per_quiz": total_questions / total_quizzes if total_quizzes > 0 else 0
        }
        
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch statistics"
        )


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "status_code": exc.status_code,
            "timestamp": datetime.utcnow().isoformat()
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    # Run the app
    # In production, use: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
