# YouTube Data API Setup Guide

Complete step-by-step guide for getting your YouTube Data API key.

## Overview

The YouTube Data API v3 allows you to:
- ✅ Fetch video information (title, description, thumbnail)
- ✅ Validate YouTube URLs
- ✅ Get video metadata for reposting

**Cost**: Free tier includes 10,000 units/day (1 video fetch = ~1 unit)

## Step 1: Create Google Cloud Project

### 1.1 Go to Google Cloud Console

1. Visit **https://console.cloud.google.com/**
2. Sign in with your Google account
3. If you don't have an account, create one at **https://accounts.google.com/signup**

### 1.2 Create New Project

1. Click the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Fill in project details:
   - **Project name**: `14ms` (or any name you prefer)
   - **Organization**: Leave as default (if applicable)
   - **Location**: Leave as default
4. Click **"Create"**
5. Wait for project creation (10-30 seconds)

### 1.3 Select Your Project

1. Click the **project dropdown** again
2. Select your newly created project (`14ms`)
3. You should see the project name in the top bar

## Step 2: Enable YouTube Data API v3

### 2.1 Navigate to APIs & Services

1. In the left sidebar, click **"APIs & Services"**
2. Click **"Library"** (or go directly to **https://console.cloud.google.com/apis/library**)

### 2.2 Search for YouTube Data API

1. In the search bar, type: **"YouTube Data API v3"**
2. Click on **"YouTube Data API v3"** from the results

### 2.3 Enable the API

1. You'll see the API details page
2. Click the **"Enable"** button (blue button at the top)
3. Wait for API to be enabled (5-10 seconds)
4. You'll see a confirmation message

## Step 3: Create API Credentials

### 3.1 Go to Credentials Page

1. In the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"**
3. Or go directly to: **https://console.cloud.google.com/apis/credentials**

### 3.2 Create API Key

1. Click **"+ CREATE CREDENTIALS"** button at the top
2. Select **"API key"** from the dropdown
3. A popup will appear with your new API key
4. **IMPORTANT**: Copy the API key immediately (you won't see it again!)
5. Click **"Close"** (don't restrict yet - we'll do that next)

### 3.3 Save Your API Key

**Save this key securely:**
- Copy to a text file
- Store in password manager
- You'll need it for your `.env.local` and Render environment variables

**Example API key format:**
```
AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Restrict API Key (Recommended for Security)

### 4.1 Edit API Key Restrictions

1. Go back to **"Credentials"** page
2. Find your API key in the list
3. Click on the API key name (or click the edit/pencil icon)

### 4.2 Set Application Restrictions

1. Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
2. Click **"Add an item"**
3. Add your domains:
   - For local development: `http://localhost:3000/*`
   - For production: `https://14ms-web.onrender.com/*`
   - For custom domain: `https://14ms.com/*` (if applicable)
4. Click **"Save"**

### 4.3 Set API Restrictions

1. Under **"API restrictions"**, select **"Restrict key"**
2. Check the box next to **"YouTube Data API v3"**
3. Uncheck any other APIs (if selected)
4. Click **"Save"**

**Why restrict?**
- ✅ Prevents unauthorized use of your API key
- ✅ Limits access to only YouTube Data API
- ✅ Reduces risk if key is accidentally exposed

## Step 5: Verify API Key Works

### 5.1 Test API Key

You can test your API key using this URL (replace `YOUR_API_KEY`):

```
https://www.googleapis.com/youtube/v3/videos?id=dQw4w9WgXcQ&key=YOUR_API_KEY&part=snippet
```

**Expected Response:**
```json
{
  "kind": "youtube#videoListResponse",
  "items": [
    {
      "snippet": {
        "title": "Video Title",
        "description": "Video Description",
        ...
      }
    }
  ]
}
```

### 5.2 Check Quota Usage

1. Go to **"APIs & Services"** → **"Dashboard"**
2. Find **"YouTube Data API v3"**
3. Check your quota usage
4. Default quota: **10,000 units per day**

**Quota Costs:**
- `videos.list` (fetch video info): ~1 unit per request
- You can make ~10,000 requests per day (free tier)

## Step 6: Add API Key to Your Project

### 6.1 Local Development (.env.local)

1. Open your `.env.local` file
2. Add your YouTube API key:
   ```
   YOUTUBE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file
4. Restart your development server

### 6.2 Production (Render)

1. Go to Render Dashboard
2. Navigate to **14ms-web** → **"Environment"** tab
3. Add environment variable:
   - **Key**: `YOUTUBE_API_KEY`
   - **Value**: Your API key (e.g., `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
4. Click **"Save Changes"**
5. Redeploy service (or wait for auto-deploy)

## Troubleshooting

### Issue: "API key not valid"

**Solutions:**
1. Verify API key is copied correctly (no extra spaces)
2. Check API key restrictions allow your domain
3. Ensure YouTube Data API v3 is enabled
4. Check API key hasn't been deleted

### Issue: "Quota exceeded"

**Symptoms**: API returns 403 error with "quotaExceeded"

**Solutions:**
1. Check quota usage in Google Cloud Console
2. Wait for quota reset (daily at midnight Pacific Time)
3. Request quota increase (if needed):
   - Go to **"APIs & Services"** → **"Dashboard"**
   - Click **"YouTube Data API v3"**
   - Click **"Quotas"** tab
   - Request increase if needed

### Issue: "API key restricted"

**Symptoms**: API works locally but not in production

**Solutions:**
1. Check HTTP referrer restrictions include your production domain
2. Add production domain to allowed referrers
3. Verify domain matches exactly (including `https://` and `/*`)

### Issue: "API not enabled"

**Symptoms**: Error about API not being enabled

**Solutions:**
1. Go to **"APIs & Services"** → **"Library"**
2. Search for "YouTube Data API v3"
3. Click **"Enable"** if not already enabled
4. Wait a few minutes for changes to propagate

## Security Best Practices

✅ **DO:**
- Restrict API key to specific domains
- Restrict API key to only YouTube Data API
- Store API key in environment variables (never in code)
- Monitor quota usage regularly
- Rotate API key if exposed

❌ **DON'T:**
- Commit API key to GitHub
- Share API key publicly
- Use unrestricted API keys in production
- Exceed quota limits

## Additional Resources

- **YouTube Data API Docs**: https://developers.google.com/youtube/v3
- **API Explorer**: https://developers.google.com/youtube/v3/docs
- **Quota Calculator**: https://developers.google.com/youtube/v3/getting-started#quota
- **Google Cloud Console**: https://console.cloud.google.com/

## Quick Reference

**API Key Location**: Google Cloud Console → APIs & Services → Credentials  
**API Documentation**: https://developers.google.com/youtube/v3  
**Quota**: 10,000 units/day (free tier)  
**Cost**: Free (within quota limits)

---

## Checklist

- [ ] Created Google Cloud project
- [ ] Enabled YouTube Data API v3
- [ ] Created API key
- [ ] Restricted API key (application & API restrictions)
- [ ] Tested API key works
- [ ] Added to `.env.local` (local development)
- [ ] Added to Render environment variables (production)

