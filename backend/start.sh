#!/bin/bash

echo "🚀 Starting AI Quiz Generator Backend..."
cd backend
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
