# Setting Environment Variables in Render

## ⚠️ IMPORTANT: Never Commit `.env.local` to GitHub

Your `.env.local` file contains **sensitive credentials** that should NEVER be in your GitHub repository. Instead, set them directly in Render's dashboard.

## How to Set Environment Variables in Render

### Step 1: Go to Render Dashboard

1. Log in to https://render.com
2. Navigate to your service (e.g., `14ms-web`)

### Step 2: Add Environment Variables

1. Click on your service
2. Go to **"Environment"** tab
3. Click **"Add Environment Variable"**

### Step 3: Add Each Variable

Add these variables one by one:

#### App Variables
```
NEXT_PUBLIC_APP_URL=https://14ms.com
NODE_ENV=production
```

#### Supabase Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://wpgqhqxzbfwvksuomsdk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3FocXh6YmZ3dmtzdW9tc2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwODAxMjIsImV4cCI6MjA4MTY1NjEyMn0.gOvFihPmVs44pJgj6zPGR7qqPas62fNP0sGLEW3FgP4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3FocXh6YmZ3dmtzdW9tc2RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjA4MDEyMiwiZXhwIjoyMDgxNjU2MTIyfQ.UilqY0sLucSSIOwKOS9JNeU27MBuHnwm_SYyvIlKC8s
```

#### YouTube API
```
YOUTUBE_API_KEY=your_youtube_api_key
```

#### TikTok API
```
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://14ms.com/api/tiktok/callback
```

#### OpenRouter
```
OPENROUTER_API_KEY=your_openrouter_api_key
```

#### Redis (Auto-configured)
```
REDIS_URL=redis://... (Auto-set from Render Redis service)
```

### Step 4: Set for Both Services

You need to set environment variables for:
1. **Web Service** (`14ms-web`)
2. **Worker Service** (`14ms-worker`)

**Note**: Some variables are only needed in specific services:
- **Web Service**: Needs all variables
- **Worker Service**: Needs `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `OPENROUTER_API_KEY`, `REDIS_URL`

## Why This Approach is Better

✅ **Security**: Secrets never in Git
✅ **Flexibility**: Different values for dev/staging/production
✅ **Best Practice**: Industry standard approach
✅ **Easy Updates**: Change values without code changes

## Alternative: Using Render's Environment File (Advanced)

If you have many variables, you can also:

1. Create a `.env.production` file (without real secrets)
2. Use Render's "Environment File" feature
3. Upload the file through Render dashboard

But setting them individually in the dashboard is recommended.

## Verify Variables Are Set

After setting variables:
1. Go to your service
2. Check "Environment" tab
3. Verify all variables are listed
4. Redeploy your service to apply changes

---

## ⚠️ Security Reminder

**NEVER**:
- ❌ Commit `.env.local` to GitHub
- ❌ Share your service role key publicly
- ❌ Put secrets in code comments
- ❌ Use the same keys for dev and production

**ALWAYS**:
- ✅ Use Render's environment variables
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Use different keys for different environments
- ✅ Rotate keys if exposed

