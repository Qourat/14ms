# Environment Variables Reference

Complete reference for all environment variables used in the 14ms project.

## Local Development (.env.local)

Your `.env.local` file has been created with all required variables. This file is **never committed to Git** (it's in `.gitignore`).

## Environment Variables

### Application Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your application URL (public, accessible in browser) | `http://localhost:3000` (local) or `https://14ms.com` (production) |

### Supabase Configuration

| Variable | Description | Where Used |
|----------|-------------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (public) | Web app, Worker |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key (public) | Web app (client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) | Web app (server-side), Worker |
| `SUPABASE_URL` | Same as NEXT_PUBLIC_SUPABASE_URL (for worker) | Worker service |

**Note**: 
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - **keep it secret!**

### YouTube API

| Variable | Description | Where Used |
|----------|-------------|------------|
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | Web app (API routes) |

**Setup**: See [`YOUTUBE_API_SETUP.md`](./YOUTUBE_API_SETUP.md)

### TikTok API

| Variable | Description | Where Used |
|----------|-------------|------------|
| `TIKTOK_CLIENT_KEY` | TikTok app client key | Web app, Worker |
| `TIKTOK_CLIENT_SECRET` | TikTok app client secret (secret) | Web app, Worker |
| `TIKTOK_REDIRECT_URI` | OAuth callback URL | Web app (must match TikTok app settings) |

**Important**: 
- `TIKTOK_REDIRECT_URI` must match **exactly** in TikTok Developer Portal
- Local: `http://localhost:3000/api/tiktok/callback`
- Production: `https://yourdomain.com/api/tiktok/callback`

**Setup**: See [`TIKTOK_API_SETUP.md`](./TIKTOK_API_SETUP.md)

### OpenRouter API

| Variable | Description | Where Used |
|----------|-------------|------------|
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features | Web app, Worker |

**Setup**: Get from https://openrouter.ai/

### Redis Configuration

| Variable | Description | Where Used |
|----------|-------------|------------|
| `REDIS_URL` | Redis connection string | Web app (queue), Worker |

**Local Development**: `redis://localhost:6379`  
**Production**: Auto-configured by Render from Redis service

## Variable Usage by Service

### Web Service (apps/web)

**Required Variables:**
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `YOUTUBE_API_KEY`
- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET`
- `TIKTOK_REDIRECT_URI`
- `OPENROUTER_API_KEY`
- `REDIS_URL` (auto-set in production)

### Worker Service (apps/worker)

**Required Variables:**
- `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`)
- `SUPABASE_SERVICE_ROLE_KEY`
- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET`
- `OPENROUTER_API_KEY`
- `REDIS_URL` (auto-set in production)

## Setting Up Environment Variables

### Local Development

1. **`.env.local` file** (already created):
   - Located in project root
   - Contains all your local development variables
   - Never committed to Git

2. **Verify variables are loaded**:
   ```bash
   # Check if variables are accessible
   node -e "console.log(process.env.NEXT_PUBLIC_APP_URL)"
   ```

### Production (Render)

See [`RENDER_SETUP.md`](./RENDER_SETUP.md) for detailed instructions on setting environment variables in Render dashboard.

**Quick Steps:**
1. Go to Render Dashboard
2. Select your service (14ms-web or 14ms-worker)
3. Go to "Environment" tab
4. Add each variable
5. Save and redeploy

## Security Notes

### ⚠️ Never Commit Secrets

- ❌ Never commit `.env.local` to Git
- ❌ Never commit API keys or secrets
- ✅ Use `.env.example` as a template (without real values)
- ✅ Use environment variables in hosting platforms

### 🔐 Secret Variables

These variables contain sensitive data and should be kept secret:
- `SUPABASE_SERVICE_ROLE_KEY` - Full database access
- `TIKTOK_CLIENT_SECRET` - TikTok app secret
- `OPENROUTER_API_KEY` - API access key
- `YOUTUBE_API_KEY` - YouTube API access

### 🌐 Public Variables

These variables are safe to expose (used in browser):
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

### Issue: Variables not loading

**Symptoms**: `undefined` when accessing `process.env.VARIABLE_NAME`

**Solutions:**
1. Verify variable name is correct (case-sensitive)
2. Restart development server after adding variables
3. Check `.env.local` file exists in project root
4. Verify no extra spaces around `=`
5. Check variable name matches exactly (no typos)

### Issue: NEXT_PUBLIC_ variables not available

**Symptoms**: Public variables not accessible in browser

**Solutions:**
1. Ensure variable name starts with `NEXT_PUBLIC_`
2. Restart Next.js dev server
3. Clear browser cache
4. Check Next.js is reading `.env.local`

### Issue: Worker can't access variables

**Symptoms**: Worker service fails with "variable not configured"

**Solutions:**
1. Verify variables are set in Render dashboard (for production)
2. Check variable names match exactly
3. Ensure worker has access to required variables
4. Restart worker service

## Current Configuration

Your `.env.local` is configured with:

✅ **Application**: `http://localhost:3000`  
✅ **Supabase**: Configured with your project  
✅ **YouTube API**: Configured  
✅ **TikTok API**: Configured (redirect URI: `http://localhost:3000/api/tiktok/callback`)  
✅ **OpenRouter API**: Configured  
✅ **Redis**: `redis://localhost:6379` (local)

## Next Steps

1. ✅ Verify `.env.local` exists and has all variables
2. ✅ Update TikTok Developer Portal redirect URI to match `TIKTOK_REDIRECT_URI`
3. ✅ Start local development: `pnpm dev`
4. ✅ Test application functionality
5. ✅ Set up production variables in Render (see `RENDER_SETUP.md`)

---

## Quick Reference

**Local File**: `.env.local` (project root)  
**Template**: `.env.example` (if exists)  
**Production**: Render Dashboard → Service → Environment tab

**Important**: Always keep `.env.local` in `.gitignore` and never commit it to version control!

