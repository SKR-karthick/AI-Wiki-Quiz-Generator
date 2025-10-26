# 🚀 Quick Reference - AI Wiki Quiz Generator# Quick Start Guide - AI Wiki Quiz Generator



**Complete Submission Package by S.Karthick Raja**## ⚡ 5-Minute Setup



---### Step 1: Get API Key (1 min)

1. Visit https://aistudio.google.com/

## ⚡ Quick Start2. Click "Get API Key"

3. Copy the API key

### Start Backend

```bash### Step 2: Backend Setup (2 min)

cd backend

python -m uvicorn main:app --reload --port 8000**On Windows (PowerShell)**:

``````powershell

# Navigate to backend

### Start Frontendcd backend

```bash

cd frontend# Create virtual environment

npm run devpython -m venv venv

```

# Activate it

### Access Application.\venv\Scripts\activate

Open browser: `http://localhost:5173`

# Install dependencies

---pip install -r requirements.txt



## ✅ Submission Requirements Status# Create .env file

Copy .env.template .env

1. **Complete Working Code** ✅

   - Backend: FastAPI + Groq + SQLite# Edit .env and add your GEMINI_API_KEY

   - Frontend: React + Vite + Tailwindnotepad .env

```

2. **Screenshots** 📸 (See `screenshots/README.md`)

   - Quiz Generation Page (Tab 1)**On macOS/Linux**:

   - History View (Tab 2)```bash

   - Details Modalcd backend

python3 -m venv venv

3. **Sample Data** ✅source venv/bin/activate

   - Test URLs: `sample_data/test_urls.json`pip install -r requirements.txt

   - Sample outputs: `sample_data/sample_output_*.json`cp .env.template .env

# Edit .env with your editor

4. **README** ✅```

   - Complete documentation in `README.md`

### Step 3: Start Backend (1 min)

5. **LLM Prompts** ✅```bash

   - Location: `backend/llm_quiz_generator.py`# From backend directory with venv activated

   - Documented in `README.md` and `SUBMISSION.md`python -m uvicorn main:app --reload --port 8000

```

---

You should see:

## 📸 Take Screenshots```

Uvicorn running on http://127.0.0.1:8000

1. Generate quiz from URL```

2. Screenshot Tab 1 with quiz → `screenshots/quiz_generation.png`

3. Click Tab 2 (History) → `screenshots/history_view.png`Open http://localhost:8000/docs to see API documentation ✅

4. Click "View Details" → `screenshots/details_modal.png`

### Step 4: Frontend Setup (1 min)

---

**In a new terminal**:

## 🔑 API Key```bash

# Navigate to frontend

Get free Groq API key: https://console.groq.com  cd frontend

Add to `backend/.env`:

```# Install dependencies

GROQ_API_KEY=your_key_herenpm install

```

# Start dev server

---npm run dev

```

## 📡 API Endpoints

You should see:

- `GET /` - Health check```

- `POST /generate_quiz` - Generate quiz  ➜  Local:   http://localhost:3000/

- `GET /history` - Get all quizzes```

- `GET /quiz/{id}` - Get quiz details

- `DELETE /quiz/{id}` - Delete quiz### Step 5: Test the App! 🚀



---1. Open http://localhost:3000 in your browser

2. Go to "Generate Quiz" tab

## 🧪 Test URLs3. Paste this URL: https://en.wikipedia.org/wiki/Alan_Turing

4. Click "Generate Quiz"

Use these Wikipedia URLs (in `sample_data/test_urls.json`):5. Wait 5-10 seconds for processing

- Albert Einstein6. View your quiz! 📚

- Python Programming

- Climate Change---

- Ancient Egypt

- Machine Learning## 📋 Prerequisites Checklist

- World War II

Before starting, make sure you have:

---

- [ ] Python 3.10+ installed (`python --version`)

## 📚 Documentation- [ ] Node.js 16+ installed (`node --version`)

- [ ] npm installed (`npm --version`)

- `README.md` - Main documentation- [ ] Gemini API key (free from https://aistudio.google.com/)

- `SUBMISSION.md` - Submission checklist- [ ] Internet connection (for Wikipedia scraping & LLM API)

- `SUBMISSION_STRUCTURE.md` - Package structure

---

---

## 🔧 Detailed Setup Instructions

**All requirements met! Take screenshots and submit.** ✅

### Database Setup (Optional)

The system works with SQLite by default (no setup needed). If you want PostgreSQL or MySQL:

**PostgreSQL**:
```bash
# Create database
createdb quiz_db

# Update .env
DATABASE_URL="postgresql://postgres:password@localhost/quiz_db"
```

**MySQL**:
```bash
# Create database
mysql -u root -p
CREATE DATABASE quiz_db;

# Update .env
DATABASE_URL="mysql+pymysql://root:password@localhost/quiz_db"
```

---

## 🎯 Testing the API

### Option 1: Use Frontend
Just use the web interface at http://localhost:3000

### Option 2: Use cURL

```bash
# Generate quiz
curl -X POST http://localhost:8000/generate_quiz \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"https://en.wikipedia.org/wiki/Alan_Turing\"}"

# Get history
curl http://localhost:8000/history

# Get specific quiz
curl http://localhost:8000/quiz/1

# Health check
curl http://localhost:8000/health
```

### Option 3: Use Python
```python
import requests

# Generate quiz
response = requests.post(
    "http://localhost:8000/generate_quiz",
    json={"url": "https://en.wikipedia.org/wiki/Albert_Einstein"}
)
print(response.json())
```

---

## 🧪 Example Wikipedia URLs to Test

1. **Alan Turing** (Computer Science)
   - https://en.wikipedia.org/wiki/Alan_Turing

2. **Albert Einstein** (Physics)
   - https://en.wikipedia.org/wiki/Albert_Einstein

3. **Python (Programming Language)** (Technology)
   - https://en.wikipedia.org/wiki/Python_(programming_language)

4. **Machine Learning** (AI/ML)
   - https://en.wikipedia.org/wiki/Machine_learning

5. **Ancient Egypt** (History)
   - https://en.wikipedia.org/wiki/Ancient_Egypt

6. **Climate Change** (Environment)
   - https://en.wikipedia.org/wiki/Climate_change

---

## ❓ Troubleshooting

### Backend Won't Start?

**Error: "ModuleNotFoundError: No module named 'fastapi'"**
- Solution: Make sure venv is activated and you ran `pip install -r requirements.txt`

**Error: "GEMINI_API_KEY not found"**
- Solution: Create .env file in backend folder and add your API key

### Frontend Won't Start?

**Error: "npm: command not found"**
- Solution: Install Node.js from https://nodejs.org/

**Error: Port 3000 already in use**
- Solution: Kill the process or use a different port:
  ```bash
  npm run dev -- --port 3001
  ```

### API Errors?

**Error: "Failed to generate quiz"**
- Check Gemini API key is valid
- Check Wikipedia URL is correct
- Check internet connection

**Error: "Failed to connect to database"**
- For SQLite: just delete quiz_history.db and restart (it recreates)
- For PostgreSQL/MySQL: check database is running

### CORS Errors?

- Backend already has CORS enabled
- Make sure frontend is at http://localhost:3000
- Make sure backend is at http://localhost:8000

---

## 📚 File Reference

### Backend Files
- `main.py` - FastAPI app with all endpoints
- `database.py` - Database configuration
- `models.py` - Data validation schemas
- `scraper.py` - Wikipedia scraping logic
- `llm_quiz_generator.py` - LLM integration
- `.env` - Your API keys (create from .env.template)

### Frontend Files
- `src/App.jsx` - Main app component
- `src/tabs/GenerateQuizTab.jsx` - Quiz generation page
- `src/tabs/HistoryTab.jsx` - History page
- `src/components/QuizDisplay.jsx` - Quiz display component
- `src/components/Modal.jsx` - Modal component
- `src/services/api.js` - Backend API calls

---

## 🚀 Next Steps

1. ✅ Get API running
2. ✅ Test with example URLs
3. ✅ Customize prompt templates in `llm_quiz_generator.py`
4. ✅ Add more features (user authentication, database optimization)
5. ✅ Deploy to production

---

## 📖 API Documentation

Once backend is running, visit: **http://localhost:8000/docs**

This shows interactive API documentation where you can test endpoints directly!

---

## 💡 Pro Tips

1. **Slow Generation?** The first LLM call is slower due to model initialization. Subsequent calls are faster.

2. **Want Faster API?** Use `gemini-1.5-flash` (already configured) instead of the slower models.

3. **Database Performance?** SQLite is fine for dev. Use PostgreSQL for production.

4. **Frontend Development?** React Fast Refresh is enabled, so changes auto-reload.

5. **API Testing?** Use http://localhost:8000/docs (Swagger) instead of cURL for easier testing.

---

## 🎓 Educational Value

This project demonstrates:
- ✅ Full-stack development (backend + frontend)
- ✅ AI integration with LLMs (Gemini + LangChain)
- ✅ Web scraping (BeautifulSoup)
- ✅ REST API design (FastAPI)
- ✅ Database management (SQLAlchemy)
- ✅ React component architecture
- ✅ Modern CSS with Tailwind

---

## 📞 Need Help?

1. Check README.md for detailed documentation
2. Check http://localhost:8000/docs for API reference
3. Review backend logs for errors
4. Check browser console (F12) for frontend errors

Happy learning! 🚀
