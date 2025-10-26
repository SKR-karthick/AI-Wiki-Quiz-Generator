import pytest
import sys
from pathlib import Path
import os

# Add backend directory to path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Set SQLite for tests
os.environ["DATABASE_URL"] = "sqlite:///./test_quiz.db"

from database import init_db
from main import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="session", autouse=True)
def initialize_test_db():
    """Initialize the database for testing"""
    init_db()
    yield
    # Cleanup after tests
    db_file = Path(backend_dir) / "test_quiz.db"
    if db_file.exists():
        db_file.unlink()


@pytest.fixture
def client():
    """Get test client"""
    return TestClient(app)


@pytest.fixture
def sample_fixture():
    return "sample data"