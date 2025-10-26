"""
Database configuration and models using SQLAlchemy.
Supports both PostgreSQL and MySQL databases.
"""

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./quiz_history.db"  # Fallback to SQLite for development
)

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()


class Quiz(Base):
    """
    Database model for storing quiz data.
    
    Attributes:
        id: Unique identifier (Primary Key)
        url: Wikipedia article URL
        title: Article title extracted from the page
        date_generated: Timestamp when the quiz was generated
        scraped_content: Raw HTML/text content scraped from Wikipedia (Bonus feature)
        full_quiz_data: Complete quiz data as JSON string (serialized with json.dumps())
    """
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(500), unique=False, index=True)
    title = Column(String(255), index=True)
    date_generated = Column(DateTime, default=datetime.utcnow, index=True)
    scraped_content = Column(Text, nullable=True)  # Bonus: store raw scraped content
    full_quiz_data = Column(Text, nullable=False)  # JSON string of quiz data


def get_db():
    """
    Dependency function to get database session.
    Usage: Inject into FastAPI endpoints with `Depends(get_db)`
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Initialize database tables.
    Call this function once during application startup.
    """
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    # Initialize database when running this file directly
    init_db()
    print("Database initialized successfully!")
