# Render Deployment Setup Guide

Complete step-by-step guide for deploying 14ms to Render using Blueprint (render.yaml).

## Prerequisites

Before starting, ensure you have:
- ✅ GitHub repository set up and pushed (with `render.yaml` file)
- ✅ Supabase project configured (see `SUPABASE_SETUP.md`)
- ✅ All API keys ready:
  - **YouTube Data API key** - See [`YOUTUBE_API_SETUP.md`](./YOUTUBE_API_SETUP.md) for detailed instructions
  - **TikTok Client Key & Secret** - See [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md) for detailed instructions
  - **OpenRouter API key** - Get from https://openrouter.ai/
- ✅ Domain name (optional, e.g., `14ms.com`)

**📖 Need help getting API keys?**
- **YouTube API**: See [`YOUTUBE_API_SETUP.md`](./YOUTUBE_API_SETUP.md) for step-by-step guide
- **TikTok API**: See [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md) for step-by-step guide

## Overview: Blueprint Deployment

This guide uses **Render Blueprint** (`render.yaml`) to automatically create and configure all services in one step:
- ✅ **14ms-web** (Next.js Web Service)
- ✅ **14ms-worker** (Background Worker Service)
- ✅ **14ms-redis** (Redis Queue Service)

**Benefits:**
- All services created together
- Build commands pre-configured
- Service connections auto-setup
- Environment variables template ready
- One-click deployment

## Step 1: Create Render Account

1. Go to **https://render.com**
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up with:
   - Email, or
   - **GitHub account** (recommended - easier repo connection)
4. Verify your email if required

## Step 2: Connect GitHub Repository

### 2.1 Authorize GitHub Access

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. If not connected, click **"Connect GitHub"** or **"Configure account"**
3. Authorize Render to access your GitHub repositories
4. Select repositories to grant access:
   - **Option 1**: Select **"All repositories"** (recommended)
   - **Option 2**: Select only **"qourat/14ms"** (your specific repo)

### 2.2 Verify Connection

1. You should see your GitHub repositories available
2. Your repository **`qourat/14ms`** should be visible

## Step 3: Deploy Using Blueprint (One-Step Setup)

This single step creates all three services automatically!

### 3.1 Create Blueprint

1. In Render Dashboard, click **"New +"** → **"Blueprint"**
2. Select your repository: **`qourat/14ms`** (or your repo name)
3. Render will automatically detect `render.yaml` in your repository
4. You'll see a preview showing:
   - **Blueprint Name**: `14ms` (or customize)
   - **Branch**: `main` (the branch with render.yaml)
   - **Services to be created**:
     - ✅ 14ms-web (Web Service)
     - ✅ 14ms-worker (Background Worker)
     - ✅ 14ms-redis (Redis)

### 3.2 Review Configuration

Before applying, review the configuration:

**Web Service (14ms-web):**
- Type: Web Service
- Region: Oregon
- Plan: Starter
- Build Command: `cd apps/web && npm install && npm run build`
- Start Command: `cd apps/web && npm start`

**Worker Service (14ms-worker):**
- Type: Background Worker
- Region: Oregon
- Plan: Starter
- Build Command: `cd apps/worker && npm install && npm run build`
- Start Command: `cd apps/worker && npm start`

**Redis Service (14ms-redis):**
- Type: Redis
- Region: Oregon
- Plan: Starter
- IP Allow List: All internal services (auto-configured)

### 3.3 Apply Blueprint

1. Click **"Apply"** button
2. Render will create all three services automatically
3. Wait for services to be provisioned (2-5 minutes)
4. You'll see all services appear in your dashboard

**Note**: Services will be created but won't deploy yet - you need to set environment variables first.

## Step 4: Set Environment Variables

After services are created, you need to add environment variables. **Never commit `.env.local` to GitHub!**

### 4.1 Web Service Environment Variables

Go to **14ms-web** → **"Environment"** tab → Click **"Add Environment Variable"** for each:

#### Required Variables for Web Service

| Variable Name | Value | Where to Get |
|--------------|-------|--------------|
| `NODE_ENV` | `production` | (Fixed value) |
| `NEXT_PUBLIC_APP_URL` | `https://14ms-web.onrender.com` | (Your Render URL - update if using custom domain) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wpgqhqxzbfwvksuomsdk.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase Dashboard → Settings → API (anon/public key) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase Dashboard → Settings → API (service_role key - **KEEP SECRET!**) |
| `YOUTUBE_API_KEY` | `your_youtube_api_key` | See [`YOUTUBE_API_SETUP.md`](./YOUTUBE_API_SETUP.md) for detailed setup |
| `TIKTOK_CLIENT_KEY` | `your_tiktok_client_key` | See [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md) for detailed setup |
| `TIKTOK_CLIENT_SECRET` | `your_tiktok_client_secret` | See [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md) for detailed setup (**KEEP SECRET!**) |
| `TIKTOK_REDIRECT_URI` | `https://14ms-web.onrender.com/api/tiktok/callback` | Must match TikTok app redirect URI exactly (see [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md)) |
| `OPENROUTER_API_KEY` | `your_openrouter_api_key` | OpenRouter.ai → API Keys |

**Auto-Configured (Don't Set Manually):**
- ✅ `REDIS_URL` - Automatically set from Redis service connection

#### Step-by-Step: Adding Variables

For each variable above:
1. Click **"Add Environment Variable"**
2. Enter **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
3. Enter **Value** (your actual value - no quotes needed)
4. Click **"Save Changes"**
5. Repeat for all variables

**Important Notes:**
- ❌ No quotes around values
- ❌ No spaces around `=`
- ✅ Values are case-sensitive
- ✅ Update `NEXT_PUBLIC_APP_URL` and `TIKTOK_REDIRECT_URI` if using custom domain

### 4.2 Worker Service Environment Variables

Go to **14ms-worker** → **"Environment"** tab → Click **"Add Environment Variable"** for each:

#### Required Variables for Worker Service

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NODE_ENV` | `production` | (Fixed value) |
| `SUPABASE_URL` | `https://wpgqhqxzbfwvksuomsdk.supabase.co` | Same as `NEXT_PUBLIC_SUPABASE_URL` (without `NEXT_PUBLIC_` prefix) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Same as web service |
| `TIKTOK_CLIENT_KEY` | `your_tiktok_client_key` | Same as web service |
| `TIKTOK_CLIENT_SECRET` | `your_tiktok_client_secret` | Same as web service |
| `OPENROUTER_API_KEY` | `your_openrouter_api_key` | Same as web service |

**Auto-Configured (Don't Set Manually):**
- ✅ `REDIS_URL` - Automatically set from Redis service connection

#### Quick Copy Method

Since most variables are the same as web service:
1. Copy values from web service environment variables
2. Add them to worker service (except `NEXT_PUBLIC_*` variables - worker doesn't need those)

## Step 5: Deploy Services

After setting all environment variables, deploy the services:

### 5.1 Deploy Web Service

1. Go to **14ms-web** dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for build to complete (5-10 minutes)
4. Monitor build logs for any errors

### 5.2 Deploy Worker Service

1. Go to **14ms-worker** dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for build to complete (5-10 minutes)
4. Monitor build logs for any errors

### 5.3 Enable Auto-Deploy (Optional)

After first successful deployment, enable automatic deploys:

**For Web Service:**
1. Go to **14ms-web** → **"Settings"** tab
2. Under **"Auto-Deploy"**, select **"Yes"**
3. Choose branch: **`main`**

**For Worker Service:**
1. Go to **14ms-worker** → **"Settings"** tab
2. Under **"Auto-Deploy"**, select **"Yes"**
3. Choose branch: **`main`**

**Benefits:**
- ✅ Automatically deploys on every push to `main` branch
- ✅ No manual deployment needed
- ✅ Always up-to-date with latest code

## Step 6: Verify Deployment

### 6.1 Check Service Status

1. Go to **14ms-web** dashboard
2. Status should be **"Live"** (green indicator)
3. Service URL: `https://14ms-web.onrender.com`
4. Click the URL to open your app in browser

### 6.2 Test Application

Test these features:
1. ✅ **User Registration/Login** - Create account or sign in
2. ✅ **Dashboard** - Should load without errors
3. ✅ **YouTube Import** - Test importing a YouTube Short
4. ✅ **TikTok Connection** - Connect your TikTok account
5. ✅ **Video Processing** - Check worker logs for background jobs

### 6.3 Check Logs

**Web Service Logs:**
1. Go to **14ms-web** → **"Logs"** tab
2. Check for any errors or warnings
3. Look for successful startup messages

**Worker Service Logs:**
1. Go to **14ms-worker** → **"Logs"** tab
2. Should show: `"Starting worker service..."`
3. Check for Redis connection success
4. Monitor for job processing

**Common Issues to Check:**
- ❌ Missing environment variables
- ❌ Database connection errors
- ❌ Redis connection errors
- ❌ API key authentication failures

## Step 7: Set Up Custom Domain (Optional)

If you have a custom domain (e.g., `14ms.com`):

### 7.1 Add Domain to Web Service

1. Go to **14ms-web** → **"Settings"** tab
2. Scroll to **"Custom Domains"** section
3. Click **"Add Custom Domain"**
4. Enter your domain: `14ms.com` (or `www.14ms.com`)
5. Click **"Save"**

### 7.2 Configure DNS

Render will provide DNS records:
1. Copy the **CNAME** record (e.g., `14ms-web.onrender.com`)
2. Go to your domain registrar (Namecheap, GoDaddy, etc.)
3. Add CNAME record:
   - **Type**: CNAME
   - **Name**: `@` (or `www` for www subdomain)
   - **Value**: Render-provided CNAME
   - **TTL**: `3600` (or default)

### 7.3 Wait for DNS Propagation

1. DNS changes can take 5 minutes to 48 hours
2. Check status in Render dashboard
3. Status will change to **"Verified"** when ready

### 7.4 Update Environment Variables

After domain is verified:
1. Go to **14ms-web** → **"Environment"** tab
2. Update `NEXT_PUBLIC_APP_URL` to: `https://14ms.com`
3. Update `TIKTOK_REDIRECT_URI` to: `https://14ms.com/api/tiktok/callback`
4. Click **"Save Changes"**
5. Redeploy service (or wait for auto-deploy)

### 7.5 Update TikTok App Settings

1. Go to TikTok Developer Portal
2. Edit your app settings
3. Update redirect URI to: `https://14ms.com/api/tiktok/callback`
4. Save changes

## Step 8: Monitor and Maintain

### 8.1 View Real-Time Logs

- **Web Service**: **14ms-web** → **"Logs"** tab
- **Worker Service**: **14ms-worker** → **"Logs"** tab
- **Redis**: **14ms-redis** → **"Logs"** tab (if available)

### 8.2 Monitor Performance

- **Metrics**: Service dashboard → **"Metrics"** tab
  - CPU usage
  - Memory usage
  - Request count
  - Response times
- **Uptime**: Service dashboard → **"Status"** tab
- **Events**: Service dashboard → **"Events"** tab (deployment history)

### 8.3 Update Application

**Automatic (if enabled):**
- Push changes to GitHub `main` branch
- Render automatically detects changes
- Auto-deploys both services

**Manual:**
1. Go to service dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### 8.4 Scale Services (If Needed)

If you need more resources:
1. Go to service → **"Settings"** tab
2. Change **"Instance Type"**:
   - **Starter**: $7/month (512 MB RAM) - Current
   - **Standard**: $25/month (2 GB RAM)
   - **Pro**: $85/month (4 GB RAM)

## Troubleshooting

### Issue: Blueprint Deployment Failed

**Symptoms**: Error when applying blueprint

**Solutions**:
1. Check `render.yaml` syntax is correct
2. Verify all required fields are present
3. Check Redis `ipAllowList` is set (should be `[]`)
4. Review error message in Render dashboard

### Issue: Build Fails

**Symptoms**: Build logs show errors

**Solutions**:
1. Check Node.js version (should be 20 or latest LTS)
2. Verify all dependencies in `package.json`
3. Check build command: `cd apps/web && npm install && npm run build`
4. Review specific error messages in logs
5. Try building locally first: `cd apps/web && npm run build`

### Issue: Service Won't Start

**Symptoms**: Service shows "Unhealthy" or crashes immediately

**Solutions**:
1. Check start command is correct: `cd apps/web && npm start`
2. Verify all environment variables are set
3. Check logs for specific error messages
4. Verify Redis connection (for worker service)
5. Check database connection (Supabase)

### Issue: Environment Variables Not Working

**Symptoms**: App can't connect to services (Supabase, APIs, etc.)

**Solutions**:
1. Verify all variables are set (check checklist below)
2. Check variable names match exactly (case-sensitive)
3. Ensure no extra spaces or quotes around values
4. Verify values are correct (copy from Supabase/TikTok/etc.)
5. Redeploy service after adding/updating variables

### Issue: Redis Connection Failed

**Symptoms**: Worker can't connect to Redis

**Solutions**:
1. Verify Redis service (`14ms-redis`) is running
2. Check `REDIS_URL` is auto-set (should be automatic)
3. Verify Redis is in same region as other services
4. Check Redis service status in dashboard
5. Review Redis logs for errors

### Issue: Database Connection Failed

**Symptoms**: Can't connect to Supabase

**Solutions**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (for worker)
4. Check Supabase project is active (not paused)
5. Verify network connectivity from Render

### Issue: TikTok OAuth Not Working

**Symptoms**: Can't connect TikTok account

**Solutions**:
1. Verify `TIKTOK_REDIRECT_URI` matches TikTok app settings **exactly**
2. Check `TIKTOK_CLIENT_KEY` and `TIKTOK_CLIENT_SECRET` are correct
3. Ensure TikTok app is approved (if required by TikTok)
4. Check callback URL in logs for exact redirect URI
5. Verify redirect URI uses HTTPS (not HTTP)

## Environment Variables Checklist

Use this checklist to ensure all variables are set:

### Web Service (14ms-web)

- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_APP_URL` (your Render URL or custom domain)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `YOUTUBE_API_KEY`
- [ ] `TIKTOK_CLIENT_KEY`
- [ ] `TIKTOK_CLIENT_SECRET`
- [ ] `TIKTOK_REDIRECT_URI`
- [ ] `OPENROUTER_API_KEY`
- [ ] `REDIS_URL` (auto-set - don't add manually)

### Worker Service (14ms-worker)

- [ ] `NODE_ENV=production`
- [ ] `SUPABASE_URL` (same as NEXT_PUBLIC_SUPABASE_URL)
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `TIKTOK_CLIENT_KEY`
- [ ] `TIKTOK_CLIENT_SECRET`
- [ ] `OPENROUTER_API_KEY`
- [ ] `REDIS_URL` (auto-set - don't add manually)

## Cost Estimation

### Free Tier (Limited - Not Recommended for Production)

- **Web Service**: Free (sleeps after 15 min inactivity)
- **Worker Service**: Free (sleeps after 15 min inactivity)
- **Redis**: Free (25 MB, 10 connections)

**Limitations**:
- Services spin down after inactivity
- Cold starts on first request
- Limited resources
- Not suitable for production use

### Starter Plan (Recommended for Production)

- **Web Service**: $7/month
- **Worker Service**: $7/month
- **Redis**: $10/month

**Total**: **~$24/month**

### Standard Plan (For Growth/High Traffic)

- **Web Service**: $25/month
- **Worker Service**: $25/month
- **Redis**: $10/month

**Total**: **~$60/month**

## What's Configured by Blueprint

The `render.yaml` file automatically configures:

✅ **Service Types** - Web, Worker, Redis  
✅ **Build Commands** - Pre-configured for monorepo structure  
✅ **Start Commands** - Pre-configured for each service  
✅ **Service Connections** - Redis URL auto-linked  
✅ **Region** - All services in same region (Oregon)  
✅ **Plans** - Starter plan for all services  
✅ **IP Allow List** - Redis security configured  

**You Only Need To:**
- ✅ Set environment variables
- ✅ Deploy services
- ✅ (Optional) Configure custom domain

## Next Steps After Deployment

1. ✅ Test all features end-to-end
2. ✅ Set up monitoring and alerts
3. ✅ Configure custom domain (if applicable)
4. ✅ Set up backups (Supabase handles database backups)
5. ✅ Review and optimize performance
6. ✅ Set up error tracking (e.g., Sentry, LogRocket)
7. ✅ Enable auto-deploy for automatic updates

## Additional Resources

- **Render Docs**: https://render.com/docs
- **Render Blueprint Docs**: https://render.com/docs/blueprint-spec
- **Render Status**: https://status.render.com
- **Support**: https://render.com/support

---

## Quick Reference

**Service URLs:**
- **Web Service**: `https://14ms-web.onrender.com` (or your custom domain)
- **Worker Service**: Runs in background (no public URL)
- **Redis Service**: Internal only (no public URL)

**Dashboard**: https://dashboard.render.com  
**Documentation**: https://render.com/docs

**Your Services:**
- `14ms-web` - Next.js web application
- `14ms-worker` - Background job processor
- `14ms-redis` - Queue system
