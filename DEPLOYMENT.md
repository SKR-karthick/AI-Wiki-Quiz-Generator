# Deployment Guide - AI Wiki Quiz Generator# Production Deployment Guide



This guide provides step-by-step instructions for deploying the AI Wiki Quiz Generator to production.## 🚀 Deploying AI Wiki Quiz Generator



## Table of ContentsThis guide covers deploying both backend and frontend to production.

- [Prerequisites](#prerequisites)

- [Option 1: Deploy to Render (Recommended - Free)](#option-1-deploy-to-render-recommended---free)---

- [Option 2: Deploy to Vercel + Railway](#option-2-deploy-to-vercel--railway)

- [Option 3: Deploy to Netlify + Render](#option-3-deploy-to-netlify--render)## Backend Deployment

- [Environment Variables](#environment-variables)

- [Post-Deployment](#post-deployment)### Option 1: Heroku (Recommended for Beginners)



---1. **Install Heroku CLI**:

   - Download from https://devcenter.heroku.com/articles/heroku-cli

## Prerequisites

2. **Create Heroku app**:

1. GitHub account with your code pushed   ```bash

2. Groq API key (free at https://console.groq.com)   heroku login

3. Account on deployment platform (Render, Vercel, etc.)   heroku create your-app-name

   ```

---

3. **Create Procfile** in backend root:

## Option 1: Deploy to Render (Recommended - Free)   ```

   web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app

### Step 1: Deploy Backend   ```



1. Go to [Render Dashboard](https://dashboard.render.com/)4. **Add dependencies** to requirements.txt:

2. Click **"New +"** → **"Web Service"**   ```bash

3. Connect your GitHub repository: `AI-Wiki-Quiz-Generator`   pip install gunicorn

4. Configure the service:   pip freeze > requirements.txt

   - **Name**: `ai-quiz-backend`   ```

   - **Root Directory**: `backend`

   - **Runtime**: `Python 3`5. **Set environment variables**:

   - **Build Command**: `pip install -r requirements.txt`   ```bash

   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`   heroku config:set GEMINI_API_KEY="your_key"

   - **Instance Type**: `Free`   heroku config:set DATABASE_URL="postgresql://..."

   ```

5. Add Environment Variables:

   ```6. **Deploy**:

   GROQ_API_KEY=your_groq_api_key_here   ```bash

   PYTHON_VERSION=3.11.0   git push heroku main

   ```   ```



6. Click **"Create Web Service"**### Option 2: Railway (Faster Setup)

7. Wait for deployment (5-10 minutes)

8. **Copy the backend URL** (e.g., `https://ai-quiz-backend.onrender.com`)1. Connect GitHub repo to Railway

2. Select backend folder as root directory

### Step 2: Deploy Frontend3. Add environment variables

4. Deploy automatically on push

1. In Render Dashboard, click **"New +"** → **"Static Site"**

2. Connect the same GitHub repository### Option 3: Docker + AWS/GCP/Azure

3. Configure:

   - **Name**: `ai-quiz-frontend`1. **Build Docker image**:

   - **Root Directory**: `frontend`   ```bash

   - **Build Command**: `npm install && npm run build`   docker build -t quiz-generator-backend .

   - **Publish Directory**: `dist`   ```



4. Add Environment Variable:2. **Push to container registry**:

   ```   ```bash

   VITE_API_URL=https://ai-quiz-backend.onrender.com   docker push your-registry/quiz-generator-backend

   ```   ```

   (Use the backend URL from Step 1)

3. **Deploy to Kubernetes or Cloud Run**

5. Click **"Create Static Site"**

6. Wait for deployment (3-5 minutes)### Option 4: Self-Hosted (VPS)



### Step 3: Test Your Deployment1. **Install dependencies**:

   ```bash

1. Visit your frontend URL (e.g., `https://ai-quiz-frontend.onrender.com`)   sudo apt-get update

2. Try generating a quiz with a Wikipedia URL   sudo apt-get install python3.11 python3-pip postgresql nginx supervisor

3. Check the History tab to verify database persistence   ```



---2. **Setup application**:

   ```bash

## Option 2: Deploy to Vercel + Railway   git clone your-repo

   cd backend

### Step 1: Deploy Backend to Railway   python3 -m venv venv

   source venv/bin/activate

1. Go to [Railway](https://railway.app/)   pip install -r requirements.txt

2. Click **"New Project"** → **"Deploy from GitHub repo"**   ```

3. Select your repository

4. Configure:3. **Use Supervisor to manage process**:

   - **Root Directory**: `/backend`   ```ini

   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`   [program:quiz-api]

   command=/home/user/app/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

5. Add Environment Variables:   directory=/home/user/app/backend

   ```   user=www-data

   GROQ_API_KEY=your_groq_api_key_here   autostart=true

   ```   autorestart=true

   redirect_stderr=true

6. Copy the generated Railway URL   stdout_logfile=/var/log/quiz-api.log

   ```

### Step 2: Deploy Frontend to Vercel

4. **Configure Nginx reverse proxy**:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)   ```nginx

2. Click **"Add New Project"** → **"Import Git Repository"**   server {

3. Select your repository       listen 80;

4. Configure:       server_name api.yourdomain.com;

   - **Framework Preset**: `Vite`

   - **Root Directory**: `frontend`       location / {

   - **Build Command**: `npm run build`           proxy_pass http://127.0.0.1:8000;

   - **Output Directory**: `dist`           proxy_http_version 1.1;

           proxy_set_header Upgrade $http_upgrade;

5. Add Environment Variable:           proxy_set_header Connection "upgrade";

   ```           proxy_set_header Host $host;

   VITE_API_URL=your_railway_backend_url           proxy_set_header X-Real-IP $remote_addr;

   ```       }

   }

6. Click **"Deploy"**   ```



------



## Option 3: Deploy to Netlify + Render## Frontend Deployment



### Step 1: Deploy Backend to Render### Option 1: Vercel (Recommended)

(Same as Option 1, Step 1)

1. **Push code to GitHub**

### Step 2: Deploy Frontend to Netlify

2. **Connect to Vercel**:

1. Go to [Netlify Dashboard](https://app.netlify.com/)   - Go to https://vercel.com

2. Click **"Add new site"** → **"Import an existing project"**   - Click "New Project"

3. Connect to GitHub and select your repository   - Import your repository

4. Configure:   - Select `frontend` folder as root

   - **Base directory**: `frontend`   - Click "Deploy"

   - **Build command**: `npm run build`

   - **Publish directory**: `frontend/dist`3. **Add environment variable**:

   ```

5. Add Environment Variable:   VITE_API_URL=https://your-backend-api.com

   ```   ```

   VITE_API_URL=your_render_backend_url

   ```4. **Auto-deploys on every push** ✅



6. Click **"Deploy site"**### Option 2: Netlify



---1. **Build locally**:

   ```bash

## Environment Variables   cd frontend

   npm run build

### Backend Variables   ```

| Variable | Description | Required | Example |

|----------|-------------|----------|---------|2. **Deploy to Netlify**:

| `GROQ_API_KEY` | Your Groq API key | Yes | `gsk_...` |   ```bash

| `PORT` | Port number (auto-set by host) | No | `8000` |   npm install -g netlify-cli

| `PYTHON_VERSION` | Python version | No | `3.11.0` |   netlify deploy --prod --dir=dist

   ```

### Frontend Variables

| Variable | Description | Required | Example |3. **Or connect GitHub** for auto-deployment

|----------|-------------|----------|---------|

| `VITE_API_URL` | Backend API URL | Yes | `https://your-backend.onrender.com` |### Option 3: AWS S3 + CloudFront



---1. **Build**:

   ```bash

## Post-Deployment   npm run build

   ```

### 1. Verify Deployment

2. **Upload to S3**:

**Backend Health Check:**   ```bash

```bash   aws s3 sync dist/ s3://your-bucket-name

curl https://your-backend-url.com/health   ```

```

3. **Setup CloudFront** for CDN and HTTPS

Expected response:

```json### Option 4: GitHub Pages

{

  "status": "healthy",1. **Build**:

  "service": "AI Wiki Quiz Generator API"   ```bash

}   npm run build

```   ```



**Frontend Check:**2. **Deploy**:

- Open your frontend URL in a browser   ```bash

- The UI should load correctly   npm install -g gh-pages

- Try generating a quiz   gh-pages -d dist

   ```

### 2. Update CORS Settings (Production)

---

In `backend/main.py`, update CORS to allow only your frontend domain:

## Database Setup for Production

```python

app.add_middleware(### PostgreSQL (Recommended)

    CORSMiddleware,

    allow_origins=["https://your-frontend-url.com"],1. **AWS RDS**:

    allow_credentials=True,   ```bash

    allow_methods=["*"],   # Create RDS instance

    allow_headers=["*"],   # Get connection string

)   # Set DATABASE_URL=postgresql://user:pass@host:5432/db

```   ```



### 3. Monitor Your Application2. **Self-hosted**:

   ```bash

**Render:**   # Install and configure PostgreSQL

- View logs in Render Dashboard → Your Service → Logs   # Backup strategy: pg_dump

   # Monitoring: pgAdmin

**Vercel:**   ```

- View deployment logs in Vercel Dashboard → Deployments

### Backup Strategy

**Railway:**

- View logs in Railway Dashboard → Your Project → Logs```bash

# Backup database

---pg_dump -h localhost -U user quiz_db > backup.sql



## Troubleshooting# Restore from backup

psql -h localhost -U user quiz_db < backup.sql

### Backend Issues

# Automated backups (crontab)

**Issue: Backend failing to start**0 2 * * * pg_dump quiz_db | gzip > /backups/quiz_db_$(date +\%Y\%m\%d).sql.gz

- Check logs for missing dependencies```

- Verify `GROQ_API_KEY` is set correctly

- Ensure Python version is 3.11+---



**Issue: Database errors**## Performance Optimization

- SQLite is auto-created on first run

- Check write permissions in deployment environment### Backend



### Frontend Issues1. **Enable caching**:

   ```python

**Issue: API calls failing**   from fastapi_cache2 import FastAPICache2

- Verify `VITE_API_URL` points to correct backend   from fastapi_cache2.backends.redis import RedisBackend

- Check browser console for CORS errors   

- Ensure backend is running and accessible   @cached(expire=300)  # Cache for 5 minutes

   async def get_history():

**Issue: Build failures**       ...

- Clear cache and rebuild   ```

- Check Node.js version (should be 18+)

2. **Use production ASGI server**:

### Free Tier Limitations   ```bash

   pip install gunicorn uvicorn

**Render Free Tier:**   gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app

- Services sleep after 15 minutes of inactivity   ```

- First request after sleep takes ~30 seconds to wake up

- 750 hours/month limit3. **Database optimization**:

   ```sql

**Vercel Free Tier:**   CREATE INDEX idx_url ON quizzes(url);

- 100 GB bandwidth/month   CREATE INDEX idx_date ON quizzes(date_generated);

- Unlimited deployments   ```



**Railway Free Tier:**4. **Monitor performance**:

- $5 free credit/month   - Use APM: New Relic, DataDog

- Services sleep after inactivity   - Check response times, error rates



---### Frontend



## Updating Your Deployment1. **Code splitting**:

   ```javascript

1. **Make changes locally**   const HistoryTab = React.lazy(() => import('./tabs/HistoryTab'));

2. **Commit and push to GitHub:**   ```

   ```bash

   git add .2. **Image optimization**:

   git commit -m "Update feature"   ```bash

   git push origin main   npm install vite-plugin-image-optimization

   ```   ```

3. **Auto-deployment:** Most platforms auto-deploy on push to main branch

3. **Enable gzip** in web server

---

4. **Use CDN** for static assets

## Custom Domain (Optional)

---

### Render

1. Go to your service → Settings → Custom Domain## Security Checklist

2. Add your domain and follow DNS configuration instructions

- [ ] Remove `DEBUG=True` from production `.env`

### Vercel- [ ] Use HTTPS/SSL certificates

1. Go to your project → Settings → Domains- [ ] Secure API keys (use secrets manager)

2. Add domain and update DNS records- [ ] Enable CORS only for your domain

- [ ] Validate all user inputs

---- [ ] Use rate limiting

- [ ] Keep dependencies updated

## Cost Optimization- [ ] Enable security headers (HSTS, CSP)

- [ ] Regular security audits

**Current Setup (Free):**- [ ] Database backups

- Render: Free tier for both backend and frontend

- Groq API: Free tier with rate limits### Security Headers (Nginx):

- Total: **$0/month**

```nginx

**If you need more:**add_header Strict-Transport-Security "max-age=31536000" always;

- Render Starter: $7/month per serviceadd_header X-Content-Type-Options "nosniff" always;

- Railway: Pay-as-you-go after free creditsadd_header X-Frame-Options "DENY" always;

- Groq Pro: Higher rate limitsadd_header X-XSS-Protection "1; mode=block" always;

```

---

---

## Support

## Monitoring & Logging

For deployment issues:

1. Check platform-specific documentation### Application Monitoring

2. Review deployment logs

3. Test endpoints individually```python

4. Verify environment variables# In main.py

import logging

---

logging.basicConfig(

**Your AI Wiki Quiz Generator is now live! 🎉**    level=logging.INFO,

    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### Error Tracking

Add Sentry for error monitoring:

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0
)
```

### Performance Monitoring

- AWS CloudWatch
- Google Cloud Monitoring
- New Relic
- DataDog

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          git push heroku main
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
          npx vercel deploy --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Environment Variables for Production

**Backend .env**:
```env
GEMINI_API_KEY=your_production_key
DATABASE_URL=postgresql://prod_user:prod_pass@prod-host:5432/quiz_db
DEBUG=False
LOG_LEVEL=INFO
CORS_ORIGINS=["https://yourdomain.com", "https://www.yourdomain.com"]
```

**Frontend .env.production**:
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Scaling Considerations

### When to Scale

- API response time > 500ms
- Database connections maxed out
- CPU usage > 80% consistently

### Scaling Strategies

1. **Horizontal Scaling** (more servers):
   - Load balancer (Nginx, HAProxy)
   - Multiple API instances
   - Distributed database

2. **Vertical Scaling** (bigger servers):
   - More CPU/RAM
   - Better database instance
   - Limited by cost

3. **Caching Layer**:
   - Redis for frequently accessed data
   - CDN for frontend assets

4. **Database Optimization**:
   - Connection pooling
   - Read replicas
   - Sharding (if needed)

---

## Rollback Strategy

```bash
# Keep previous versions tagged
git tag v1.0.1-prod

# If issues occur
git checkout v1.0.0-prod
git push heroku main  # Redeploy previous version

# Monitor after rollback
# Fix issues in development
# Create new release
```

---

## Cost Optimization

| Service | Free Tier | Starter | Notes |
|---------|-----------|---------|-------|
| Heroku | No | $7/mo | Quick deploy |
| Railway | $5/mo | $5/mo | Fast, simple |
| Vercel | Yes | $20/mo | Frontend only |
| Netlify | Yes | $19/mo | Frontend only |
| AWS RDS | 1 year free | $15+/mo | PostgreSQL database |
| Gemini API | Free | Free | 60 req/min free tier |

---

## Testing Production

1. **Health Checks**:
   ```bash
   curl https://api.yourdomain.com/health
   ```

2. **Load Testing**:
   ```bash
   npm install -g artillery
   artillery quick --count 100 --num 10 https://api.yourdomain.com/
   ```

3. **Smoke Tests**:
   - Test critical user flows
   - Automated regression tests
   - Monitor for errors

---

## Troubleshooting Production Issues

### High Latency

1. Check API response times
2. Monitor database queries
3. Check server CPU/memory
4. Look for N+1 queries
5. Add caching

### Database Issues

1. Check connection pool
2. Monitor slow queries
3. Check disk space
4. Run VACUUM/OPTIMIZE

### API Errors

1. Check Gemini API status
2. Verify API key not expired
3. Check rate limits
4. Review error logs

---

## Support & Maintenance

- Regular backups (daily)
- Monitor error rates
- Update dependencies monthly
- Security patches immediately
- Review logs weekly
- Performance audits quarterly

---

**Ready to go live? Let's deploy! 🚀**
