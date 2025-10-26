# 🚀 Quick Deployment Checklist

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] Groq API key is ready (Get from: https://console.groq.com)
- [ ] Choose deployment platform (Render recommended for free tier)

---

## Deploy Backend to Render

1. [ ] Go to https://dashboard.render.com/
2. [ ] Click "New +" → "Web Service"
3. [ ] Connect GitHub repository: `AI-Wiki-Quiz-Generator`
4. [ ] Fill in:
   - Name: `ai-quiz-backend`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Instance: **Free**

5. [ ] Add Environment Variable:
   ```
   GROQ_API_KEY = your_actual_groq_api_key
   ```

6. [ ] Click "Create Web Service"
7. [ ] Wait for deployment (~5-10 min)
8. [ ] **COPY BACKEND URL** (e.g., `https://ai-quiz-backend.onrender.com`)
9. [ ] Test health: Visit `https://your-backend.onrender.com/health`

---

## Deploy Frontend to Render

1. [ ] In Render Dashboard, click "New +" → "Static Site"
2. [ ] Connect same GitHub repository
3. [ ] Fill in:
   - Name: `ai-quiz-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. [ ] Add Environment Variable:
   ```
   VITE_API_URL = https://ai-quiz-backend.onrender.com
   ```
   (Use the backend URL from step above!)

5. [ ] Click "Create Static Site"
6. [ ] Wait for deployment (~3-5 min)

---

## Post-Deployment Testing

1. [ ] Open frontend URL in browser
2. [ ] Test quiz generation with this URL:
   ```
   https://en.wikipedia.org/wiki/Python_(programming_language)
   ```
3. [ ] Verify quiz is generated successfully
4. [ ] Check "History" tab to confirm database is working
5. [ ] Test viewing quiz details by clicking on a quiz
6. [ ] Verify scoring works by taking a quiz

---

## Important Notes

⚠️ **Render Free Tier:**
- Services sleep after 15 minutes of inactivity
- First request wakes it up (~30 seconds delay)
- Completely normal behavior for free tier!

⚠️ **Backend URL:**
- Make sure to use the EXACT backend URL in frontend env variable
- Include `https://` but NO trailing slash
- Example: `https://ai-quiz-backend.onrender.com` ✅
- NOT: `https://ai-quiz-backend.onrender.com/` ❌

⚠️ **Environment Variables:**
- Never commit `.env` files to GitHub
- Double-check GROQ_API_KEY is correct
- Frontend MUST have backend URL to work

---

## Troubleshooting

**Backend not starting:**
- Check logs in Render Dashboard
- Verify GROQ_API_KEY is set
- Make sure Python version is 3.11+

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Ensure backend is deployed and running

**Quiz generation fails:**
- Check GROQ_API_KEY is valid
- Verify backend logs for errors
- Test backend health endpoint first

---

## Success Criteria

✅ Backend health check returns `{"status": "healthy"}`
✅ Frontend loads without errors
✅ Can generate quiz from Wikipedia URL
✅ Quiz appears in History tab
✅ Can view quiz details
✅ Scoring works correctly

---

## Next Steps After Deployment

1. [ ] Share your deployed app URL!
2. [ ] Test with different Wikipedia articles
3. [ ] Monitor usage (Render dashboard shows metrics)
4. [ ] Consider custom domain (optional)
5. [ ] Update README with your live demo link

---

## Your Deployed URLs

**Frontend:** `_______________________________`

**Backend:** `_______________________________`

**GitHub:** https://github.com/SKR-karthick/AI-Wiki-Quiz-Generator

---

**Deployment Time:** ~15-20 minutes total
**Cost:** $0 (Free tier)

🎉 Happy Deploying!
