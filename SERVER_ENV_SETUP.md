# Setting Environment Variables for Server Deployment

## ⚠️ CRITICAL: Never Commit `.env.local` to GitHub

**Your `.env.local` contains sensitive secrets that should NEVER be in your repository.**

## How Servers Actually Work

When you deploy to Render (or any hosting platform):
- The server does NOT read `.env.local` from your code
- Environment variables must be set in the hosting platform's dashboard
- This is the secure way to handle secrets

## Setting Variables in Render Dashboard

### Step 1: Access Your Service

1. Go to https://render.com/dashboard
2. Click on your service: **`14ms-web`** or **`14ms-worker`**

### Step 2: Add Environment Variables

1. Click **"Environment"** tab
2. Click **"Add Environment Variable"**
3. Add each variable from your `.env.local`:

**For Web Service (`14ms-web`):**
```
NEXT_PUBLIC_APP_URL=https://14ms.com
NEXT_PUBLIC_SUPABASE_URL=https://wpgqhqxzbfwvksuomsdk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3FocXh6YmZ3dmtzdW9tc2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwODAxMjIsImV4cCI6MjA4MTY1NjEyMn0.gOvFihPmVs44pJgj6zPGR7qqPas62fNP0sGLEW3FgP4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3FocXh6YmZ3dmtzdW9tc2RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjA4MDEyMiwiZXhwIjoyMDgxNjU2MTIyfQ.UilqY0sLucSSIOwKOS9JNeU27MBuHnwm_SYyvIlKC8s
YOUTUBE_API_KEY=your_youtube_api_key
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://14ms.com/api/tiktok/callback
OPENROUTER_API_KEY=your_openrouter_api_key
```

**For Worker Service (`14ms-worker`):**
```
SUPABASE_URL=https://wpgqhqxzbfwvksuomsdk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwZ3FocXh6YmZ3dmtzdW9tc2RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjA4MDEyMiwiZXhwIjoyMDgxNjU2MTIyfQ.UilqY0sLucSSIOwKOS9JNeU27MBuHnwm_SYyvIlKC8s
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

**Redis URL** is automatically set from the Redis service connection.

### Step 3: Redeploy

After adding variables, click **"Manual Deploy"** → **"Deploy latest commit"**

## Why This is Better Than Committing `.env.local`

✅ **Security**: Secrets never exposed in code
✅ **Flexibility**: Different values per environment
✅ **Best Practice**: Industry standard
✅ **Easy Management**: Update without code changes

## If You Still Want to Commit (NOT RECOMMENDED)

**⚠️ WARNING: This exposes your secrets publicly!**

If you absolutely must (which I strongly discourage), you would need to:

1. Remove `.env.local` from `.gitignore`
2. Commit it (exposing all secrets)
3. Anyone with access to your repo can see your keys
4. You'll need to rotate all keys immediately after

**I strongly recommend using Render's environment variables instead.**

