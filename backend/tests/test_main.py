import pytest
from fastapi.testclient import TestClient
from main import app

# Use the client from conftest
@pytest.fixture
def client():
    return TestClient(app)


def test_root(client):
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_health(client):
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()


def test_history_empty(client):
    """Test history endpoint returns list"""
    response = client.get("/history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_generate_quiz_invalid_url(client):
    """Test generate quiz with invalid URL"""
    response = client.post(
        "/generate_quiz",
        json={"url": "invalid-url"}
    )
    # Should either reject or handle gracefully
    assert response.status_code in [400, 422, 500]


def test_stats(client):
    """Test stats endpoint"""
    response = client.get("/stats")
    assert response.status_code == 200
    stats = response.json()
    assert "total_quizzes" in stats
    assert "total_questions" in stats