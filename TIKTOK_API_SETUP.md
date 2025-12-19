# TikTok Developer API Setup Guide

Complete step-by-step guide for getting your TikTok API credentials.

## Overview

TikTok Developer API allows you to:
- ✅ Connect user TikTok accounts via OAuth
- ✅ Upload videos to TikTok
- ✅ Post videos directly to user's TikTok account

**Important Notes:**
- TikTok API requires app approval for production use
- Some features may be in beta/limited access
- Direct Post API may have specific requirements

## Step 1: Create TikTok Developer Account

### 1.1 Go to TikTok Developers Portal

1. Visit **https://developers.tiktok.com/**
2. Click **"Log in"** or **"Sign up"** (top right)
3. Sign in with your TikTok account
   - If you don't have a TikTok account, create one at **https://www.tiktok.com/signup**

### 1.2 Access Developer Portal

1. After logging in, you'll be redirected to the Developer Portal
2. If this is your first time, you may need to:
   - Accept terms and conditions
   - Complete developer profile
   - Verify your email/phone

## Step 2: Create a New App

### 2.1 Navigate to Apps

1. In the Developer Portal, click **"My Apps"** in the top navigation
2. Or go directly to: **https://developers.tiktok.com/apps**

### 2.2 Create App

1. Click **"Create app"** or **"+ Add app"** button
2. Fill in app details:

   **App Information:**
   - **App name**: `14ms` (or your preferred name)
   - **App description**: `YouTube Shorts to TikTok reposting platform`
   - **App category**: Select **"Entertainment"** or **"Social"**
   - **App icon**: Upload an icon (optional, but recommended)
   - **Website URL**: Your website URL (e.g., `https://14ms.com` or `https://14ms-web.onrender.com`)

3. Click **"Submit"** or **"Create"**

### 2.3 Wait for App Creation

1. App creation may take a few minutes
2. You'll see your app in the "My Apps" list
3. Status may show as "Pending" initially

## Step 3: Configure App Settings

### 3.1 Access App Settings

1. Click on your app name from the "My Apps" list
2. You'll see the app dashboard

### 3.2 Get Client Key and Client Secret

1. In the app dashboard, find the **"Basic Information"** section
2. You'll see:
   - **Client Key** (also called App ID)
   - **Client Secret** (click "Show" to reveal)

3. **IMPORTANT**: Copy both values immediately
   - **Client Key**: Looks like `awxxxxxxxxxxxxxxxxxx`
   - **Client Secret**: Looks like `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

4. **Save these securely** - you'll need them for your environment variables

### 3.3 Configure Redirect URI

1. Scroll to **"Platform Information"** or **"OAuth 2.0"** section
2. Find **"Redirect URI"** or **"Callback URL"**
3. Click **"Add"** or **"Edit"**

4. Add your redirect URIs:

   **For Local Development:**
   ```
   http://localhost:3000/api/tiktok/callback
   ```

   **For Production (Render):**
   ```
   https://14ms-web.onrender.com/api/tiktok/callback
   ```

   **For Custom Domain (if applicable):**
   ```
   https://14ms.com/api/tiktok/callback
   ```

5. Click **"Save"** or **"Add"**

**Important:**
- ✅ Redirect URI must match **exactly** (including `http://` vs `https://`)
- ✅ No trailing slashes
- ✅ Must be HTTPS in production
- ✅ Can add multiple URIs (one per line)

### 3.4 Configure Scopes/Permissions

1. Find **"Scopes"** or **"Permissions"** section
2. Enable the following scopes:
   - ✅ `user.info.basic` - Get user basic information
   - ✅ `video.publish` - Publish videos
   - ✅ `video.upload` - Upload videos

3. Click **"Save"** after selecting scopes

## Step 4: Submit App for Review (Production)

### 4.1 App Review Requirements

For production use, TikTok requires app review:

1. **App must be functional** - Your app should be working
2. **Privacy Policy** - Must have a privacy policy URL
3. **Terms of Service** - Must have terms of service URL
4. **Video demonstration** - May be required
5. **Use case description** - Explain how you use TikTok API

### 4.2 Submit for Review

1. In app dashboard, find **"Submit for Review"** or **"App Review"** section
2. Fill in required information:
   - App description
   - Use case
   - Privacy policy URL
   - Terms of service URL
   - Video demo (if required)

3. Click **"Submit"**

4. **Review Process:**
   - Can take 1-7 business days
   - TikTok will review your app
   - You'll receive email notifications

### 4.3 Development/Sandbox Mode

- Apps start in **"Development"** or **"Sandbox"** mode
- In this mode:
  - ✅ Can test with your own TikTok account
  - ✅ Limited to test users
  - ❌ Cannot be used by other users
  - ❌ Limited functionality

**For Production:**
- Must submit for review
- Must be approved before public use

## Step 5: Test OAuth Connection

### 5.1 Test Locally

1. Start your local development server
2. Navigate to your app's TikTok connection page
3. Click "Connect TikTok"
4. You should be redirected to TikTok authorization page
5. Authorize your app
6. You should be redirected back to your callback URL

### 5.2 Verify Connection

1. Check that TikTok account is connected
2. Verify access token is stored
3. Test fetching user info

## Step 6: Add Credentials to Your Project

### 6.1 Local Development (.env.local)

1. Open your `.env.local` file
2. Add your TikTok credentials:
   ```
   TIKTOK_CLIENT_KEY=awxxxxxxxxxxxxxxxxxx
   TIKTOK_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
   ```
3. Save the file
4. Restart your development server

### 6.2 Production (Render)

1. Go to Render Dashboard
2. Navigate to **14ms-web** → **"Environment"** tab
3. Add environment variables:

   **For Web Service:**
   - **Key**: `TIKTOK_CLIENT_KEY`
     **Value**: Your Client Key (e.g., `awxxxxxxxxxxxxxxxxxx`)
   
   - **Key**: `TIKTOK_CLIENT_SECRET`
     **Value**: Your Client Secret (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   
   - **Key**: `TIKTOK_REDIRECT_URI`
     **Value**: `https://14ms-web.onrender.com/api/tiktok/callback`
     (Or your custom domain: `https://14ms.com/api/tiktok/callback`)

4. Navigate to **14ms-worker** → **"Environment"** tab
5. Add the same `TIKTOK_CLIENT_KEY` and `TIKTOK_CLIENT_SECRET` (worker doesn't need redirect URI)

6. Click **"Save Changes"** for each service
7. Redeploy services (or wait for auto-deploy)

## Troubleshooting

### Issue: "Invalid redirect_uri"

**Symptoms**: OAuth callback fails with redirect URI error

**Solutions:**
1. Verify redirect URI in TikTok app settings matches exactly
2. Check for trailing slashes (should be none)
3. Verify `http://` vs `https://` matches
4. Ensure redirect URI is added in TikTok Developer Portal
5. Check environment variable `TIKTOK_REDIRECT_URI` matches exactly

### Issue: "Invalid client_id" or "Invalid client_secret"

**Symptoms**: Authentication fails

**Solutions:**
1. Verify Client Key and Client Secret are correct
2. Check for extra spaces when copying
3. Ensure credentials are from the correct app
4. Verify app is active (not deleted or suspended)

### Issue: "App not approved" or "Sandbox mode"

**Symptoms**: Can only connect your own account, not other users

**Solutions:**
1. This is normal for Development/Sandbox mode
2. Submit app for review to enable production use
3. Complete all required information in app review
4. Wait for TikTok approval (1-7 business days)

### Issue: "Scope not granted"

**Symptoms**: Missing permissions for video upload/publish

**Solutions:**
1. Check scopes are enabled in app settings
2. Verify scopes requested in OAuth URL match enabled scopes
3. Re-authorize app with correct scopes
4. Check app review status (some scopes require approval)

### Issue: "Rate limit exceeded"

**Symptoms**: API calls fail with rate limit error

**Solutions:**
1. Check TikTok API rate limits for your app tier
2. Implement rate limiting in your code
3. Add retry logic with exponential backoff
4. Contact TikTok support if limits are too restrictive

## Security Best Practices

✅ **DO:**
- Keep Client Secret secure (never commit to GitHub)
- Use HTTPS for all redirect URIs in production
- Store credentials in environment variables
- Rotate credentials if exposed
- Monitor API usage and rate limits
- Keep app information up to date

❌ **DON'T:**
- Commit Client Secret to GitHub
- Share credentials publicly
- Use HTTP redirect URIs in production
- Hardcode credentials in code
- Expose Client Secret in frontend code

## TikTok API Documentation

- **Developer Portal**: https://developers.tiktok.com/
- **API Documentation**: https://developers.tiktok.com/doc/
- **OAuth Guide**: https://developers.tiktok.com/doc/oauth-overview
- **Video Upload**: https://developers.tiktok.com/doc/tiktok-api-v2-post-video/
- **Rate Limits**: https://developers.tiktok.com/doc/rate-limits

## Important Notes

### Direct Post API

- TikTok Direct Post API may have specific requirements
- Some features may be in beta
- Check latest documentation for current status
- May require additional permissions or approval

### App Review Process

- **Development Mode**: Test with your account only
- **Sandbox Mode**: Limited test users
- **Production**: Requires app review and approval
- Review can take 1-7 business days

### Rate Limits

- TikTok API has rate limits per app
- Limits vary by app tier and feature
- Check documentation for current limits
- Implement proper error handling

## Quick Reference

**Developer Portal**: https://developers.tiktok.com/  
**My Apps**: https://developers.tiktok.com/apps  
**API Docs**: https://developers.tiktok.com/doc/  
**OAuth Docs**: https://developers.tiktok.com/doc/oauth-overview

**Credentials Location**: Developer Portal → My Apps → Your App → Basic Information

---

## Checklist

- [ ] Created TikTok Developer account
- [ ] Created new app in Developer Portal
- [ ] Got Client Key and Client Secret
- [ ] Configured redirect URIs (local + production)
- [ ] Enabled required scopes (user.info.basic, video.publish, video.upload)
- [ ] Added credentials to `.env.local` (local development)
- [ ] Added credentials to Render environment variables (production)
- [ ] Tested OAuth connection locally
- [ ] Submitted app for review (if going to production)
- [ ] Updated redirect URI in TikTok app settings when deploying

