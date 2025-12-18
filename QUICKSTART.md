# Quick Start Guide

This project has been set up according to the technical specification. Here's what has been created:

## Project Structure

```
14ms/
├── apps/
│   ├── web/              # Next.js frontend + API routes
│   └── worker/           # Background worker service
├── packages/
│   └── shared/           # Shared code between apps
├── supabase/
│   └── migrations/       # Database migrations
└── .github/
    └── workflows/       # GitHub Actions for deployment
```

## What's Implemented

### ✅ Core Infrastructure
- Monorepo setup with Turborepo and pnpm workspaces
- Next.js 14 app with App Router
- TypeScript configuration for all packages
- Tailwind CSS setup

### ✅ Database & Auth
- Complete Supabase database schema (6 migrations)
- Row Level Security (RLS) policies
- User profiles, TikTok accounts, imports, posts, jobs, analytics tables
- Supabase client libraries (browser, server, middleware)

### ✅ API Libraries
- YouTube API integration (video info fetching, validation)
- TikTok API integration (OAuth, upload, status)
- OpenRouter AI integration (caption & hashtag generation)

### ✅ API Routes
- `/api/youtube/fetch` - Fetch YouTube video info
- `/api/youtube/validate` - Validate YouTube URLs
- `/api/tiktok/auth` - Generate TikTok OAuth URL
- `/api/tiktok/callback` - Handle TikTok OAuth callback
- `/api/tiktok/post` - Queue TikTok posts
- `/api/ai/generate-caption` - Generate AI captions
- `/api/ai/optimize-hashtags` - Optimize hashtags
- `/api/jobs/create` - Create background jobs
- `/api/jobs/status` - Get job status

### ✅ Worker Service
- Download processor (YouTube video download)
- Upload processor (TikTok video upload)
- BullMQ queue integration
- Redis connection handling

### ✅ Frontend Pages
- Login & Register pages
- Dashboard with stats
- Placeholder pages for Imports, Posts, Settings, Analytics

### ✅ Deployment
- Render.com configuration (render.yaml)
- GitHub Actions workflows
- Docker Compose for local Redis

## Next Steps

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations in order:
   ```bash
   # In Supabase SQL Editor, run each migration file in order:
   # 00001_create_users_profile.sql
   # 00002_create_tiktok_accounts.sql
   # 00003_create_imports.sql
   # 00004_create_posts.sql
   # 00005_create_jobs.sql
   # 00006_create_analytics.sql
   ```
3. Create a storage bucket named `videos`
4. Enable RLS on the bucket

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and fill in:
- Supabase URL and keys
- YouTube API key
- TikTok OAuth credentials
- OpenRouter API key
- Redis URL

### 4. Start Local Development
```bash
# Start Redis
docker-compose up -d

# Start all apps
pnpm dev
```

### 5. Get API Keys

**YouTube Data API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Enable YouTube Data API v3
4. Create credentials (API key)

**TikTok Developer:**
1. Go to [TikTok Developers](https://developers.tiktok.com/)
2. Create an app
3. Get Client Key and Client Secret
4. Set redirect URI: `http://localhost:3000/api/tiktok/callback`

**OpenRouter:**
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up and get API key

## Important Notes

1. **Worker Service**: The worker needs to run separately. In development, run `cd apps/worker && pnpm dev` in a separate terminal.

2. **Redis**: Required for the queue system. Use Docker Compose locally or Render Redis in production.

3. **TikTok API**: Requires an approved developer app. The Direct Post API may have restrictions.

4. **Video Downloads**: Uses `@distube/ytdl-core`. Make sure to comply with YouTube's Terms of Service.

5. **Storage**: Supabase storage bucket must be created and configured with proper RLS policies.

## Development Tips

- Use `pnpm dev` to run all apps in development mode
- Check `apps/web/app/api/` for API route implementations
- Worker processors are in `apps/worker/src/processors/`
- Database types are auto-generated in `apps/web/types/database.ts`

## Deployment

1. Push to GitHub
2. Connect repository to Render
3. Render will use `render.yaml` for configuration
4. Set environment variables in Render dashboard
5. GitHub Actions will auto-deploy on push to main

## Missing Components (To Be Implemented)

The following components are placeholders and need full implementation:
- Import form and video preview components
- Post editor with caption/hashtag editing
- TikTok account connection UI
- Analytics charts and metrics
- Job status polling UI
- Error handling and retry logic

These can be built incrementally based on the existing API routes and database schema.

