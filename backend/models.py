"""
Pydantic models for data validation.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class QuizQuestion(BaseModel):
    question: str = Field(..., description="The quiz question text")
    options: List[str] = Field(..., min_items=4, max_items=4, description="Four answer options (A-D)")
    answer: str = Field(..., description="The correct answer (must be one of the options)")
    difficulty: str = Field(..., description="Difficulty level: 'easy', 'medium', or 'hard'")
    explanation: str = Field(..., description="Short explanation of why this is the correct answer")


class KeyEntities(BaseModel):
    people: List[str] = Field(default_factory=list, description="Notable people mentioned")
    organizations: List[str] = Field(default_factory=list, description="Organizations mentioned")
    locations: List[str] = Field(default_factory=list, description="Locations mentioned")


class QuizOutput(BaseModel):
    title: str = Field(..., description="Article title")
    summary: str = Field(..., description="Brief summary of the article (2-3 sentences)")
    key_entities: KeyEntities = Field(default_factory=KeyEntities, description="Extracted entities")
    sections: List[str] = Field(default_factory=list, description="Main sections of the article")
    quiz: List[QuizQuestion] = Field(
        ...,
        min_items=5,
        max_items=10,
        description="Array of 5-10 quiz questions"
    )
    related_topics: List[str] = Field(
        default_factory=list,
        description="Related Wikipedia topics for further reading"
    )


class QuizHistoryItem(BaseModel):
    """
    Schema for quiz history list (used in /history endpoint).
    Returns minimal information for the history table.
    """
    id: int
    url: str
    title: str
    date_generated: datetime


class QuizDetailResponse(BaseModel):
    """
    Schema for complete quiz details (used in /quiz/{id} endpoint).
    Includes all quiz data plus metadata.
    """
    id: int
    url: str
    title: str
    date_generated: datetime
    summary: Optional[str] = None
    key_entities: Optional[KeyEntities] = None
    sections: Optional[List[str]] = None
    quiz: List[QuizQuestion] = Field(default_factory=list)
    related_topics: Optional[List[str]] = None


class GenerateQuizRequest(BaseModel):
    """
    Schema for the /generate_quiz POST request.
    """
    url: str = Field(..., description="Wikipedia article URL")


class ErrorResponse(BaseModel):
    """
    Schema for error responses.
    """
    detail: str = Field(..., description="Error message")
    error_code: Optional[str] = None
    timestamp: Optional[datetime] = None
