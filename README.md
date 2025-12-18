# 14ms

A web application that allows users to import YouTube Shorts and repost them to TikTok. Built with a modern stack using Render (hosting), Supabase (database/auth), GitHub (version control), and OpenRouter (AI APIs).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Separate Node.js Worker Service
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI Services**: OpenRouter API
- **Hosting**: Render (Web Service + Background Worker)
- **Queue System**: BullMQ with Redis (Render Redis)

## Project Structure

This is a monorepo managed with Turborepo and pnpm workspaces:

- `apps/web` - Next.js frontend and API routes
- `apps/worker` - Background worker service for video processing
- `packages/shared` - Shared code between apps

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repo>
   cd 14ms
   pnpm install
   ```

2. **Setup Supabase**
   - Create project at supabase.com
   - Run migrations in `supabase/migrations/` in order
   - Create storage bucket named `videos`
   - Enable RLS on bucket

3. **Configure APIs**
   - Get YouTube Data API key from Google Cloud Console
   - Register TikTok developer app
   - Get OpenRouter API key

4. **Local Development**
   ```bash
   cp .env.example .env.local
   # Fill in environment variables
   docker-compose up -d  # Starts Redis
   pnpm dev
   ```

5. **Deploy to Render**
   - Connect GitHub repo
   - Use `render.yaml` for service config
   - Set environment variables in Render dashboard

## Development

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## License

Private

