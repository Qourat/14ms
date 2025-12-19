# Render Deployment Setup Guide

Complete step-by-step guide for deploying 14ms to Render.

## Prerequisites

Before starting, ensure you have:
- ✅ GitHub repository set up and pushed
- ✅ Supabase project configured (see `SUPABASE_SETUP.md`)
- ✅ All API keys ready:
  - YouTube Data API key
  - TikTok Client Key & Secret
  - OpenRouter API key
- ✅ Domain name (optional, e.g., `14ms.com`)

## Step 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up with:
   - Email, or
   - GitHub account (recommended for easier repo connection)
4. Verify your email if required

## Step 2: Create Redis Service

Redis is needed for the queue system. Create it first so other services can reference it.

### 2.1 Create Redis Instance

1. In Render Dashboard, click **"New +"** → **"Redis"**
2. Configure:
   - **Name**: `14ms-redis`
   - **Region**: `Oregon` (or closest to your users)
   - **Plan**: `Starter` ($10/month) or `Free` (limited)
   - **Max Memory Policy**: `noeviction`
3. Click **"Create Redis"**
4. Wait for Redis to be provisioned (1-2 minutes)

### 2.2 Save Redis Connection String

1. Once created, click on `14ms-redis`
2. Go to **"Info"** tab
3. Copy the **"Internal Redis URL"** (starts with `redis://`)
4. **Save this** - you'll need it later

**Note**: The connection string will be automatically shared with other services via `render.yaml`.

## Step 3: Connect GitHub Repository

### 3.1 Connect GitHub Account

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Click **"Connect GitHub"** or **"Configure account"**
3. Authorize Render to access your GitHub repositories
4. Select repositories to grant access (or "All repositories")

### 3.2 Verify Repository Access

1. Go to Render Dashboard
2. You should see your GitHub repositories available

## Step 4: Deploy Services Using Blueprint

The easiest way is to use the `render.yaml` blueprint file.

### 4.1 Create Blueprint

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Select your repository: **`qourat/14ms`** (or your repo name)
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**

### 4.2 Review Services

Render will create 3 services:
- ✅ **14ms-web** (Web Service)
- ✅ **14ms-worker** (Background Worker)
- ✅ **14ms-redis** (Redis - already created)

**Note**: If Redis was already created, Render will use the existing one.

### 4.3 Configure Services

For each service, you'll need to set environment variables (see Step 5).

## Step 5: Set Environment Variables

Environment variables must be set for each service. **Never commit `.env.local` to GitHub!**

### 5.1 Web Service Environment Variables

Go to **14ms-web** → **"Environment"** tab → Add these variables:

#### Required Variables

```
NODE_ENV=production
```

```
NEXT_PUBLIC_APP_URL=https://14ms-web.onrender.com
```
*(Replace with your custom domain if you have one)*

```
NEXT_PUBLIC_SUPABASE_URL=https://wpgqhqxzbfwvksuomsdk.supabase.co
```
*(Your Supabase project URL)*

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Your Supabase anon/public key)*

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Your Supabase service role key - keep secret!)*

```
YOUTUBE_API_KEY=your_youtube_api_key_here
```
*(From Google Cloud Console)*

```
TIKTOK_CLIENT_KEY=your_tiktok_client_key
```
*(From TikTok Developer Portal)*

```
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
```
*(From TikTok Developer Portal - keep secret!)*

```
TIKTOK_REDIRECT_URI=https://14ms-web.onrender.com/api/tiktok/callback
```
*(Must match TikTok app redirect URI exactly)*

```
OPENROUTER_API_KEY=your_openrouter_api_key
```
*(From OpenRouter.ai)*

#### Redis URL (Auto-configured)

The `REDIS_URL` is automatically set from the Redis service connection. You don't need to set it manually if using `render.yaml`.

### 5.2 Worker Service Environment Variables

Go to **14ms-worker** → **"Environment"** tab → Add these variables:

#### Required Variables

```
NODE_ENV=production
```

```
SUPABASE_URL=https://wpgqhqxzbfwvksuomsdk.supabase.co
```
*(Same as NEXT_PUBLIC_SUPABASE_URL but without NEXT_PUBLIC_ prefix)*

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*(Same as web service)*

```
TIKTOK_CLIENT_KEY=your_tiktok_client_key
```
*(Same as web service)*

```
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
```
*(Same as web service)*

```
OPENROUTER_API_KEY=your_openrouter_api_key
```
*(Same as web service)*

#### Redis URL (Auto-configured)

The `REDIS_URL` is automatically set from the Redis service connection.

### 5.3 How to Add Variables in Render

For each variable:
1. Click **"Add Environment Variable"**
2. Enter **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
3. Enter **Value** (your actual value)
4. Click **"Save Changes"**
5. Repeat for all variables

**Important**: 
- No quotes needed around values
- No spaces around `=`
- Values are case-sensitive

## Step 6: Configure Build Settings

### 6.1 Web Service Build Settings

Go to **14ms-web** → **"Settings"** tab:

- **Build Command**: `cd apps/web && npm install && npm run build`
- **Start Command**: `cd apps/web && npm start`
- **Node Version**: `20` (or latest LTS)
- **Root Directory**: Leave empty (root of repo)

### 6.2 Worker Service Build Settings

Go to **14ms-worker** → **"Settings"** tab:

- **Build Command**: `cd apps/worker && npm install && npm run build`
- **Start Command**: `cd apps/worker && npm start`
- **Node Version**: `20` (or latest LTS)
- **Root Directory**: Leave empty (root of repo)

**Note**: If using `render.yaml`, these are already configured.

## Step 7: Deploy Services

### 7.1 Manual Deploy

1. Go to each service (14ms-web, 14ms-worker)
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for build to complete (5-10 minutes)
4. Check build logs for errors

### 7.2 Automatic Deploys

After first deploy, Render will automatically deploy on:
- Push to `main` branch (if enabled)
- Manual trigger from dashboard

To enable auto-deploy:
1. Go to service → **"Settings"** tab
2. Under **"Auto-Deploy"**, select **"Yes"**
3. Choose branch (usually `main`)

## Step 8: Verify Deployment

### 8.1 Check Service Status

1. Go to **14ms-web** dashboard
2. Status should be **"Live"** (green)
3. Service URL: `https://14ms-web.onrender.com`
4. Click the URL to open your app

### 8.2 Test Application

1. Open your app URL
2. Test user registration/login
3. Test YouTube import
4. Test TikTok connection
5. Check worker logs for background jobs

### 8.3 Check Logs

For each service:
1. Go to service dashboard
2. Click **"Logs"** tab
3. Check for errors or warnings
4. Common issues:
   - Missing environment variables
   - Database connection errors
   - Redis connection errors

## Step 9: Set Up Custom Domain (Optional)

If you have a custom domain (e.g., `14ms.com`):

### 9.1 Add Domain to Web Service

1. Go to **14ms-web** → **"Settings"** tab
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain: `14ms.com`
5. Click **"Save"**

### 9.2 Configure DNS

Render will provide DNS records to add:
1. Copy the **CNAME** record
2. Go to your domain registrar (e.g., Namecheap, GoDaddy)
3. Add CNAME record:
   - **Name**: `@` or `www`
   - **Value**: Render-provided CNAME
   - **TTL**: `3600`

### 9.3 Update Environment Variables

After domain is verified:
1. Update `NEXT_PUBLIC_APP_URL` to `https://14ms.com`
2. Update `TIKTOK_REDIRECT_URI` to `https://14ms.com/api/tiktok/callback`
3. Redeploy service

### 9.4 Update TikTok App Settings

1. Go to TikTok Developer Portal
2. Update redirect URI to: `https://14ms.com/api/tiktok/callback`
3. Save changes

## Step 10: Monitor and Maintain

### 10.1 View Logs

- **Real-time logs**: Service dashboard → **"Logs"** tab
- **Historical logs**: Service dashboard → **"Events"** tab

### 10.2 Monitor Performance

- **Metrics**: Service dashboard → **"Metrics"** tab
- **Uptime**: Service dashboard → **"Status"** tab
- **Response times**: Check metrics for slow requests

### 10.3 Update Application

To deploy updates:
1. Push changes to GitHub `main` branch
2. Render auto-deploys (if enabled)
3. Or manually deploy from dashboard

### 10.4 Scale Services

If you need more resources:
1. Go to service → **"Settings"** tab
2. Change **"Instance Type"**:
   - **Starter**: $7/month (512 MB RAM)
   - **Standard**: $25/month (2 GB RAM)
   - **Pro**: $85/month (4 GB RAM)

## Troubleshooting

### Issue: Build Fails

**Symptoms**: Build logs show errors

**Solutions**:
1. Check Node.js version (should be 20)
2. Verify all dependencies in `package.json`
3. Check build command is correct
4. Review error messages in logs

### Issue: Service Won't Start

**Symptoms**: Service shows "Unhealthy" or crashes

**Solutions**:
1. Check start command is correct
2. Verify all environment variables are set
3. Check logs for specific errors
4. Verify Redis connection (for worker)

### Issue: Environment Variables Not Working

**Symptoms**: App can't connect to services

**Solutions**:
1. Verify variables are set (no typos)
2. Check variable names match code exactly
3. Ensure no extra spaces or quotes
4. Redeploy after adding variables

### Issue: Redis Connection Failed

**Symptoms**: Worker can't connect to Redis

**Solutions**:
1. Verify Redis service is running
2. Check `REDIS_URL` is set correctly
3. Verify Redis is in same region
4. Check Redis service status

### Issue: Database Connection Failed

**Symptoms**: Can't connect to Supabase

**Solutions**:
1. Verify Supabase URL is correct
2. Check API keys are valid
3. Verify Supabase project is active
4. Check network connectivity

### Issue: TikTok OAuth Not Working

**Symptoms**: Can't connect TikTok account

**Solutions**:
1. Verify `TIKTOK_REDIRECT_URI` matches TikTok app settings exactly
2. Check `TIKTOK_CLIENT_KEY` and `TIKTOK_CLIENT_SECRET` are correct
3. Ensure TikTok app is approved (if required)
4. Check callback URL in logs

## Environment Variables Checklist

### Web Service (14ms-web)

- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_APP_URL` (your app URL)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `YOUTUBE_API_KEY`
- [ ] `TIKTOK_CLIENT_KEY`
- [ ] `TIKTOK_CLIENT_SECRET`
- [ ] `TIKTOK_REDIRECT_URI`
- [ ] `OPENROUTER_API_KEY`
- [ ] `REDIS_URL` (auto-set from Redis service)

### Worker Service (14ms-worker)

- [ ] `NODE_ENV=production`
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `TIKTOK_CLIENT_KEY`
- [ ] `TIKTOK_CLIENT_SECRET`
- [ ] `OPENROUTER_API_KEY`
- [ ] `REDIS_URL` (auto-set from Redis service)

## Cost Estimation

### Free Tier (Limited)

- **Web Service**: Free (with limitations)
- **Worker Service**: Free (with limitations)
- **Redis**: Free (25 MB, 10 connections)

**Limitations**:
- Services sleep after 15 minutes of inactivity
- Limited resources
- Not suitable for production

### Starter Plan (Recommended for Production)

- **Web Service**: $7/month
- **Worker Service**: $7/month
- **Redis**: $10/month

**Total**: ~$24/month

### Standard Plan (For Growth)

- **Web Service**: $25/month
- **Worker Service**: $25/month
- **Redis**: $10/month

**Total**: ~$60/month

## Next Steps After Deployment

1. ✅ Test all features end-to-end
2. ✅ Set up monitoring and alerts
3. ✅ Configure custom domain (if applicable)
4. ✅ Set up backups (Supabase handles this)
5. ✅ Review and optimize performance
6. ✅ Set up error tracking (e.g., Sentry)

## Additional Resources

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Support**: https://render.com/support

---

## Quick Reference

**Web Service URL**: `https://14ms-web.onrender.com`  
**Worker Service**: Runs in background (no public URL)  
**Redis Service**: Internal only (no public URL)

**Dashboard**: https://dashboard.render.com  
**Documentation**: https://render.com/docs

