# AI Wiki Quiz Generator# 🎓 AI Wiki Quiz Generator# AI Wiki Quiz Generator



A full-stack web application that generates educational quizzes from Wikipedia articles using AI.



**Author:** S.Karthick RajaTransform Wikipedia articles into engaging, educational quizzes using AI-powered question generation.**Transform Wikipedia articles into engaging quizzes using AI**



## Features



- Generate quizzes from any Wikipedia article![Version](https://img.shields.io/badge/version-1.0.0-blue)A full-stack application that leverages AI (Gemini API via LangChain) to automatically generate educational quizzes from Wikipedia articles. Built with Python (FastAPI) backend and React frontend.

- AI-powered question generation with multiple difficulty levels

- Extract key entities (people, organizations, locations)![Python](https://img.shields.io/badge/Python-3.9+-green)

- Save and browse quiz history

- Interactive quiz interface with scoring![React](https://img.shields.io/badge/React-18+-61DAFB)## 🎯 Features

- Suggest related topics for further learning

![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688)

## Tech Stack

### Core Features

### Backend

- FastAPI (Python web framework)**Created by S.Karthick Raja**- ✅ **Quiz Generation**: Accept Wikipedia URLs and generate 5-10 contextual questions

- Groq AI (LLM for quiz generation)

- SQLite (Database)- ✅ **AI-Powered Content**: Uses Gemini LLM via LangChain for intelligent quiz creation

- BeautifulSoup4 (Web scraping)

- Pydantic (Data validation)## 📋 Table of Contents- ✅ **Database Storage**: Persistent storage of quizzes in PostgreSQL/MySQL/SQLite



### Frontend- ✅ **Quiz History**: Browse all previously generated quizzes

- React 18

- Vite (Build tool)- [Features](#features)- ✅ **Take Quiz Mode**: Interactive quiz interface with scoring

- Tailwind CSS

- Axios (HTTP client)- [Tech Stack](#tech-stack)- ✅ **Key Entity Extraction**: Automatically identifies people, organizations, and locations



## Setup- [Project Structure](#project-structure)- ✅ **Related Topics**: Suggests related Wikipedia articles for further reading



### Prerequisites- [Setup Instructions](#setup-instructions)

- Python 3.9+

- Node.js 16+- [API Endpoints](#api-endpoints)### Bonus Features

- Groq API Key (free from https://console.groq.com)

- [LLM Prompt Templates](#llm-prompt-templates)- 📊 Quiz scoring system with percentage calculation

### Backend Setup

- [Testing](#testing)- 🔗 Direct links to related Wikipedia topics

```bash

cd backend- [Sample Data](#sample-data)- 💾 Raw HTML storage for future reference

pip install -r requirements.txt

```- 🎨 Clean, modern UI with Tailwind CSS



Create `.env` file:---- ⚡ FastAPI with automatic API documentation

```

GROQ_API_KEY=your_api_key_here- 🔄 Efficient content scraping with BeautifulSoup

DATABASE_URL=sqlite:///./quiz_history.db

```## ✨ Features



Start server:## 📋 Prerequisites

```bash

python -m uvicorn main:app --reload --port 8000- **🤖 AI-Powered Quiz Generation**: Uses Groq's Llama 3.3 70B model to generate intelligent quizzes

```

- **📰 Wikipedia Integration**: Scrapes and processes Wikipedia articles automatically### System Requirements

### Frontend Setup

- **🎯 Smart Question Generation**: Creates 7-8 questions with varying difficulty levels- **Python 3.10+** for backend

```bash

cd frontend- **📊 Entity Extraction**: Identifies key people, organizations, and locations- **Node.js 16+** for frontend (npm/yarn)

npm install

npm run dev- **📚 Related Topics**: Suggests relevant Wikipedia topics for further reading- **PostgreSQL or MySQL** (or SQLite for development)

```

- **💾 Quiz History**: Saves all generated quizzes with timestamps- **Gemini API Key** (free tier available at https://aistudio.google.com/)

Open browser to `http://localhost:5173`

- **🎨 Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## API Endpoints

- **✅ Interactive Quiz Taking**: Answer validation with instant feedback and scoring### Environment Setup

- `POST /generate_quiz` - Generate quiz from Wikipedia URL

- `GET /history` - Get all quiz history

- `GET /quiz/{id}` - Get specific quiz

- `DELETE /quiz/{id}` - Delete quiz---1. **Get Gemini API Key**:



## Usage   - Visit https://aistudio.google.com/



1. Enter a Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Albert_Einstein)## 🛠️ Tech Stack   - Click "Get API Key" or go to Google Cloud Console

2. Click "Generate Quiz"

3. Answer the generated questions   - Create a new API key

4. Submit to see your score

5. View past quizzes in the History tab### Backend   - Copy the key for use in `.env`



## Project Structure- **FastAPI**: Modern Python web framework for building APIs



```- **Groq AI**: Lightning-fast LLM inference with Llama 3.3 70B2. **Database Setup** (Choose one):

ai-quiz-generator/

├── backend/- **SQLite**: Lightweight database for quiz history   - **SQLite**: No setup needed (auto-created, development only)

│   ├── main.py              # FastAPI app

│   ├── llm_quiz_generator.py # AI integration- **BeautifulSoup4**: Web scraping for Wikipedia articles   - **PostgreSQL**: 

│   ├── models.py            # Data models

│   ├── scraper.py           # Wikipedia scraper- **Pydantic**: Data validation and settings management     ```bash

│   └── database.py          # Database setup

├── frontend/- **Python 3.9+**: Core programming language     createdb quiz_db

│   └── src/

│       ├── App.jsx          # Main component     # Connection string: postgresql://user:password@localhost/quiz_db

│       ├── components/      # Reusable components

│       └── tabs/            # Tab views### Frontend     ```

└── sample_data/             # Example outputs

```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:

1. **Render (Recommended - Free)**
   - Backend: Web Service
   - Frontend: Static Site
   - [Step-by-step guide](./DEPLOYMENT.md#option-1-deploy-to-render-recommended---free)

2. **Vercel + Railway**
   - Frontend: Vercel
   - Backend: Railway
   - [Instructions](./DEPLOYMENT.md#option-2-deploy-to-vercel--railway)

3. **Netlify + Render**
   - Frontend: Netlify
   - Backend: Render
   - [Instructions](./DEPLOYMENT.md#option-3-deploy-to-netlify--render)

## License

```- **React 18**: Modern UI library   - **MySQL**:



## License- **Vite**: Fast build tool and dev server     ```bash



MIT License- **Tailwind CSS**: Utility-first CSS framework     mysql -u root -p


- **Axios**: HTTP client for API requests     CREATE DATABASE quiz_db;

     # Connection string: mysql+pymysql://user:password@localhost/quiz_db

---     ```



## 📁 Project Structure## 🚀 Installation & Setup



```### Backend Setup

ai-quiz-generator/

├── backend/1. **Navigate to backend directory**:

│   ├── main.py                 # FastAPI application and API endpoints   ```bash

│   ├── llm_quiz_generator.py   # Groq AI integration and prompt templates   cd backend

│   ├── models.py               # Pydantic schemas for data validation   ```

│   ├── scraper.py              # Wikipedia scraping logic

│   ├── database.py             # SQLite database setup and models2. **Create virtual environment** (Windows):

│   ├── requirements.txt        # Python dependencies   ```bash

│   ├── .env                    # Environment variables (API keys)   python -m venv venv

│   └── quiz_history.db         # SQLite database (auto-generated)   venv\Scripts\activate

│   ```

├── frontend/   

│   ├── src/   Or (macOS/Linux):

│   │   ├── App.jsx             # Main application component   ```bash

│   │   ├── main.jsx            # React entry point   python3 -m venv venv

│   │   ├── index.css           # Global styles and Tailwind imports   source venv/bin/activate

│   │   ├── components/   ```

│   │   │   ├── QuizDisplay.jsx # Reusable quiz display component

│   │   │   └── Modal.jsx       # Modal component for history details3. **Install dependencies**:

│   │   ├── tabs/   ```bash

│   │   │   ├── GenerateQuizTab.jsx  # Tab 1: Quiz generation   pip install -r requirements.txt

│   │   │   └── HistoryTab.jsx       # Tab 2: Quiz history   ```

│   │   └── services/

│   │       └── api.js          # API client configuration4. **Create `.env` file**:

│   ├── index.html   ```bash

│   ├── package.json   cp .env.template .env

│   ├── vite.config.js   # Edit .env and add your GEMINI_API_KEY and DATABASE_URL

│   └── tailwind.config.js   ```

│   

├── sample_data/   Example `.env`:

│   ├── test_urls.json                    # Example Wikipedia URLs   ```env

│   ├── sample_output_albert_einstein.json   GEMINI_API_KEY="your_api_key_here"

│   ├── sample_output_python.json   DATABASE_URL="sqlite:///./quiz_history.db"

│   └── sample_output_climate_change.json   DEBUG=True

│   ```

└── README.md                   # This file

```5. **Initialize database** (optional, auto-initializes on first run):

   ```bash

---   python database.py

   ```

## 🚀 Setup Instructions

6. **Run backend server**:

### Prerequisites   ```bash

   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

- **Python 3.9 or higher**   ```

- **Node.js 16 or higher**   

- **npm or yarn**   API docs will be available at: http://localhost:8000/docs

- **Groq API Key** (Free - Get from [https://console.groq.com](https://console.groq.com))

### Frontend Setup

### Backend Setup

1. **Navigate to frontend directory**:

1. **Navigate to backend directory**:   ```bash

   ```bash   cd frontend

   cd ai-quiz-generator/backend   ```

   ```

2. **Install dependencies**:

2. **Create virtual environment** (recommended):   ```bash

   ```bash   npm install

   python -m venv venv   # or

      yarn install

   # Windows   ```

   venv\Scripts\activate

   3. **Create `.env` file** (optional):

   # Mac/Linux   ```bash

   source venv/bin/activate   cp .env.example .env.local

   ```   # Default: VITE_API_URL=http://localhost:8000

   ```

3. **Install dependencies**:

   ```bash4. **Run development server**:

   pip install -r requirements.txt   ```bash

   ```   npm run dev

   # Frontend will be available at: http://localhost:3000

4. **Configure environment variables**:   ```

   

   Create a `.env` file in the `backend/` directory:5. **Build for production**:

   ```env   ```bash

   # Groq API Configuration (FREE - Get your key from https://console.groq.com)   npm run build

   GROQ_API_KEY=your_groq_api_key_here   # Output in `dist/` folder

      ```

   # Database Configuration

   DATABASE_URL=sqlite:///./quiz_history.db## 📚 API Endpoints

   

   # FastAPI SettingsAll endpoints return JSON responses. Base URL: `http://localhost:8000`

   DEBUG=True

   LOG_LEVEL=INFO### 1. Generate Quiz

   ```**POST** `/generate_quiz`



5. **Start the backend server**:Scrapes a Wikipedia article and generates a quiz.

   ```bash

   python -m uvicorn main:app --reload --port 8000**Request**:

   ``````json

   {

   Backend will be available at: `http://localhost:8000`  "url": "https://en.wikipedia.org/wiki/Alan_Turing"

   }

   API Documentation: `http://localhost:8000/docs````



### Frontend Setup**Response** (200 OK):

```json

1. **Navigate to frontend directory**:{

   ```bash  "id": 1,

   cd ai-quiz-generator/frontend  "url": "https://en.wikipedia.org/wiki/Alan_Turing",

   ```  "title": "Alan Turing",

  "summary": "...",

2. **Install dependencies**:  "key_entities": {

   ```bash    "people": [...],

   npm install    "organizations": [...],

   ```    "locations": [...]

  },

3. **Start the development server**:  "sections": [...],

   ```bash  "quiz": [

   npm run dev    {

   ```      "question": "...",

         "options": ["A", "B", "C", "D"],

   Frontend will be available at: `http://localhost:5173`      "answer": "A",

      "difficulty": "easy|medium|hard",

### Getting Your Free Groq API Key      "explanation": "..."

    }

1. Visit [https://console.groq.com](https://console.groq.com)  ],

2. Sign up for a free account (no credit card required)  "related_topics": [...]

3. Navigate to "API Keys" in the left sidebar}

4. Click "Create API Key"```

5. Copy the key and add it to your `.env` file

**Error Responses**:

---- `400 Bad Request`: Invalid URL or extraction failed

- `500 Internal Server Error`: LLM or database error

## 📡 API Endpoints

---

### Base URL

```### 2. Get Quiz History

http://localhost:8000**GET** `/history?limit=100&offset=0`

```

Retrieves list of all generated quizzes.

### 1. Health Check

```http**Response** (200 OK):

GET /```json

```[

  {

**Response:**    "id": 1,

```json    "url": "https://en.wikipedia.org/wiki/Alan_Turing",

{    "title": "Alan Turing",

  "message": "AI Wiki Quiz Generator API",    "date_generated": "2025-01-15T10:30:00"

  "version": "1.0.0",  },

  "status": "healthy"  ...

}]

``````



### 2. Generate Quiz**Query Parameters**:

```http- `limit` (int, default: 100): Max results to return

POST /generate_quiz- `offset` (int, default: 0): Number of results to skip

```

---

**Request Body:**

```json### 3. Get Quiz Details

{**GET** `/quiz/{quiz_id}`

  "url": "https://en.wikipedia.org/wiki/Albert_Einstein"

}Fetches complete quiz data by ID.

```

**Response** (200 OK):

**Response:**```json

```json{

{  "id": 1,

  "id": 1,  "url": "...",

  "title": "Albert Einstein",  "title": "...",

  "summary": "Albert Einstein was a German-born theoretical physicist...",  "date_generated": "...",

  "key_entities": {  "summary": "...",

    "people": ["Albert Einstein", "Max Planck"],  "key_entities": {...},

    "organizations": ["Institute for Advanced Study"],  "sections": [...],

    "locations": ["Germany", "Switzerland"]  "quiz": [...],

  },  "related_topics": [...]

  "sections": ["Early life", "Theory of relativity"],}

  "quiz": [```

    {

      "question": "What year did Einstein publish his theory of special relativity?",**Error Responses**:

      "options": ["1905", "1915", "1921", "1933"],- `404 Not Found`: Quiz ID doesn't exist

      "answer": "1905",

      "difficulty": "medium",---

      "explanation": "Einstein published his theory in 1905, his 'miracle year'."

    }### 4. Health Check

  ],**GET** `/health`

  "related_topics": ["Theory of relativity", "Quantum mechanics"],

  "url": "https://en.wikipedia.org/wiki/Albert_Einstein",Returns API health and database status.

  "created_at": "2025-10-26T12:00:00"

}**Response**:

``````json

{

### 3. Get Quiz History  "status": "healthy",

```http  "database": "connected",

GET /history  "timestamp": "2025-01-15T10:30:00"

```}

```

**Response:**

```json---

[

  {### 5. Statistics

    "id": 1,**GET** `/stats`

    "title": "Albert Einstein",

    "url": "https://en.wikipedia.org/wiki/Albert_Einstein",Returns API statistics.

    "created_at": "2025-10-26T12:00:00",

    "question_count": 8**Response**:

  }```json

]{

```  "total_quizzes": 5,

  "total_questions": 40,

### 4. Get Quiz Details  "first_quiz_date": "2025-01-10T14:20:00",

```http  "last_quiz_date": "2025-01-15T10:30:00",

GET /quiz/{quiz_id}  "average_questions_per_quiz": 8

```}

```

### 5. Delete Quiz

```http---

DELETE /quiz/{quiz_id}

```### 6. Root

**GET** `/`

---

Basic health check.

## 🤖 LLM Prompt Templates

**Response**:

### Main Quiz Generation Prompt```json

{

Located in `backend/llm_quiz_generator.py`:  "message": "AI Wiki Quiz Generator API",

  "version": "1.0.0",

```python  "status": "healthy"

prompt_template = (}

    "You are an expert educator specializing in creating educational quizzes from Wikipedia articles.\\n\\n"```

    "Given the following Wikipedia article content, generate a comprehensive, educational quiz.\\n\\n"

    "ARTICLE CONTENT:\\n{article_content}\\n\\n"## 🎮 Frontend Usage

    "REQUIREMENTS:\\n"

    "1. Generate exactly 7-8 thoughtful, factual questions based on the article.\\n"### Tab 1: Generate Quiz

    "2. Each question must:\\n"1. Enter a Wikipedia article URL (or click an example)

    "   - Be directly answerable from the provided content\\n"2. Click "Generate Quiz"

    "   - Have 4 distinct, plausible options\\n"3. Wait for processing (scraping + LLM generation)

    "   - Have one clear correct answer\\n"4. View the quiz with:

    "   - Include a brief explanation (2-3 sentences)\\n"   - Article summary

    "   - Be assigned a difficulty level (easy, medium, or hard)\\n"   - Key entities (people, organizations, locations)

    "3. Extract key entities: people, organizations, and locations.\\n"   - Main sections

    "4. Provide a 2-3 sentence summary of the article.\\n"   - Interactive quiz questions

    "5. List 3-5 main sections/topics covered.\\n"   - Related topics (clickable links)

    "6. Suggest 3-5 related Wikipedia topics for further reading.\\n\\n"

    "CRITICAL ANSWER FORMAT RULES:\\n"**Quiz Interaction**:

    "- The 'answer' field MUST contain the EXACT text from one of the options\\n"- Select answers by clicking on options

    "- Do NOT add prefixes like 'A)', 'Option A:', or any other formatting\\n"- Click "Submit Quiz" to see results

    "- Example: If options are [\\"Paris\\", \\"London\\"], answer should be \\"Paris\\" NOT \\"A) Paris\\"\\n\\n"- View correct answers and explanations

    "Return as valid JSON matching this structure..."- Click "Retake Quiz" to try again

)

```### Tab 2: History

1. Browse all generated quizzes in a table

**Key Prompt Engineering Features:**2. View quiz metadata: ID, Title, Date

- Clear role definition3. Click "View Details" to open quiz in modal

- Structured requirements4. Quiz modal allows taking the quiz again

- Answer format validation5. Click "Refresh" to reload the list

- Entity extraction

- Quality constraints## 📝 LangChain Prompt Templates



**LLM Configuration:**### Quiz Generation Prompt

```python

MODEL_NAME = "llama-3.3-70b-versatile"  # Groq's production model```python

TEMPERATURE = 0.7  # Balance creativity and consistencyprompt_template = """You are an expert educator specializing in creating educational quizzes from Wikipedia articles.

```

Given the following Wikipedia article content, generate a comprehensive, educational quiz with high-quality questions.

---

ARTICLE CONTENT:

## 🧪 Testing{article_content}



### Example Wikipedia URLsREQUIREMENTS:

1. Generate exactly 7-8 thoughtful, factual questions based on the article.

```json2. Each question must:

{   - Be directly answerable from the provided content

  "test_urls": [   - Have 4 distinct, plausible options (labeled A-D in the options array)

    {   - Have one clear correct answer (must be one of the options)

      "title": "Albert Einstein",   - Include a brief explanation (2-3 sentences) grounding the answer in the article

      "url": "https://en.wikipedia.org/wiki/Albert_Einstein"   - Be assigned a difficulty level (easy, medium, or hard)

    },

    {3. Extract key entities: people, organizations, and locations mentioned in the article.

      "title": "Python Programming",

      "url": "https://en.wikipedia.org/wiki/Python_(programming_language)"4. Provide a 2-3 sentence summary of the article.

    },

    {5. List 3-5 main sections/topics covered in the article.

      "title": "Climate Change",

      "url": "https://en.wikipedia.org/wiki/Climate_change"6. Suggest 3-5 related Wikipedia topics for further reading.

    }

  ]IMPORTANT CONSTRAINTS:

}- Do NOT hallucinate information not present in the article

```- Questions should test comprehension, not just recall

- Vary difficulty levels across questions

### Testing Steps- Ensure all options are grammatically consistent with the question



1. **Test Quiz Generation**: Enter Wikipedia URL → Verify quiz with 7-8 questionsReturn the response as a valid JSON object...

2. **Test Quiz Taking**: Answer questions → Submit → Verify scoring"""

3. **Test History**: Check Tab 2 → View details → Delete quiz```

4. **Test Error Handling**: Invalid URLs → Verify error messages

**Key Techniques**:

---- ✅ **Clear Instructions**: Specific, numbered requirements

- ✅ **Example Format**: Shows expected JSON structure

## 📦 Sample Data- ✅ **Constraints**: Emphasizes avoiding hallucination

- ✅ **Diversity**: Requests varied difficulty levels

The `sample_data/` folder contains:- ✅ **Grounding**: Requires explanations tied to content

- `test_urls.json`: Example Wikipedia URLs tested

- `sample_output_*.json`: Corresponding JSON API outputs## 🧪 Testing



Each demonstrates proper structure, entity extraction, and related topics.### Test URLs



---Good test URLs for the system:

- https://en.wikipedia.org/wiki/Alan_Turing

## 🔧 Troubleshooting- https://en.wikipedia.org/wiki/Albert_Einstein

- https://en.wikipedia.org/wiki/Python_(programming_language)

**Backend won't start:**- https://en.wikipedia.org/wiki/Machine_learning

- Check Python version (3.9+)- https://en.wikipedia.org/wiki/Ancient_Egypt

- Verify Groq API key in `.env`- https://en.wikipedia.org/wiki/World_War_II

- Ensure port 8000 is available

### Manual API Testing

**Frontend won't start:**

- Check Node version (16+)Using cURL:

- Run `npm install` again

- Check port 5173 availability```bash

# Generate quiz

**Quiz generation fails:**curl -X POST http://localhost:8000/generate_quiz \

- Verify Groq API key  -H "Content-Type: application/json" \

- Check internet connection  -d '{"url": "https://en.wikipedia.org/wiki/Alan_Turing"}'

- Ensure valid Wikipedia URL

# Get history

---curl http://localhost:8000/history



## 👨‍💻 Author# Get specific quiz

curl http://localhost:8000/quiz/1

**S.Karthick Raja**

# Health check

Created with ❤️ using AI and modern web technologies.curl http://localhost:8000/health



---# Stats

curl http://localhost:8000/stats

## 🙏 Acknowledgments```



- **Groq** for fast, free LLM inferenceUsing Python:

- **Wikipedia** for open knowledge

- **FastAPI** and **React** communities```python

import requests

BASE_URL = "http://localhost:8000"

# Generate quiz
response = requests.post(
    f"{BASE_URL}/generate_quiz",
    json={"url": "https://en.wikipedia.org/wiki/Alan_Turing"}
)
print(response.json())

# Get history
history = requests.get(f"{BASE_URL}/history").json()
print(history)

# Get specific quiz
quiz = requests.get(f"{BASE_URL}/quiz/1").json()
print(quiz)
```

### Sample Data

See `sample_data/` folder:
- `test_urls.json`: List of recommended Wikipedia URLs
- `sample_output_alan_turing.json`: Example API response

## 🏗️ Project Structure

```
ai-quiz-generator/
├── backend/
│   ├── venv/                          # Virtual environment
│   ├── database.py                    # SQLAlchemy models & setup
│   ├── models.py                      # Pydantic schemas
│   ├── scraper.py                     # Wikipedia scraping
│   ├── llm_quiz_generator.py          # LangChain + Gemini
│   ├── main.py                        # FastAPI application
│   ├── requirements.txt               # Python dependencies
│   ├── .env                           # Environment variables (local)
│   └── .env.template                  # Template for .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Modal.jsx              # Reusable modal
│   │   │   └── QuizDisplay.jsx        # Quiz rendering
│   │   ├── services/
│   │   │   └── api.js                 # Backend API calls
│   │   ├── tabs/
│   │   │   ├── GenerateQuizTab.jsx    # Tab 1
│   │   │   └── HistoryTab.jsx         # Tab 2
│   │   ├── App.jsx                    # Main component
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example                   # Example env variables
│
├── sample_data/
│   ├── test_urls.json                 # Test Wikipedia URLs
│   └── sample_output_alan_turing.json # Example API output
│
└── README.md                           # This file
```

## 📊 Code Quality & Architecture

### Backend Design Principles
- **Modular**: Separate concerns (scraping, LLM, database, API)
- **Error Handling**: Graceful failures with informative messages
- **Logging**: Comprehensive logging for debugging
- **Type Safety**: Pydantic models for validation
- **Async**: FastAPI with async/await support

### Frontend Design Principles
- **Component-Based**: Reusable, modular React components
- **State Management**: React hooks for local state
- **API Abstraction**: Centralized API service
- **Responsive**: Mobile-friendly Tailwind CSS design
- **User Feedback**: Loading states, error messages, success feedback

## 🐛 Troubleshooting

### Common Issues

**Issue: "GEMINI_API_KEY not found"**
- Solution: Create `.env` file in backend folder with `GEMINI_API_KEY="your_key"`

**Issue: "Failed to connect to database"**
- Solution: Check DATABASE_URL in `.env` and ensure database is running
- For SQLite: Just use `DATABASE_URL="sqlite:///./quiz_history.db"`

**Issue: CORS errors in frontend**
- Solution: Backend CORS is already enabled for all origins. Check that backend is running on port 8000

**Issue: "Failed to scrape Wikipedia"**
- Solution: Ensure URL is valid (https://en.wikipedia.org/wiki/...) and Wikipedia is accessible

**Issue: LLM returns invalid JSON**
- Solution: Check API key validity and rate limits. Model might be overloaded; retry.

**Issue: Frontend can't reach backend**
- Solution: Verify `VITE_API_URL` matches backend URL and port (default: http://localhost:8000)

## 📈 Performance Considerations

- **LLM Latency**: Gemini API calls take 3-10 seconds; show loading indicator
- **Database**: Use indexes on `url` and `title` for faster queries
- **Content Limits**: Scraper limits to 8000 characters for efficiency
- **Caching**: Consider caching duplicate URL requests (bonus feature)

## 🚀 Deployment

### Backend (Docker)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy `dist/` folder
```
