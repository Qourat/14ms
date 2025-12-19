# Local Development Setup Guide

## Quick Start

### Prerequisites Check

First, verify you have everything installed:

```powershell
# Check Node.js
node --version
# Should show: v18.x.x or higher

# Check pnpm
pnpm --version
# Should show: 8.x.x or higher

# Check Docker (for Redis)
docker --version
# Should show: Docker version...
```

### Step 1: Install Dependencies

If you haven't already:

```powershell
cd "C:\Users\POWER.KEY\Downloads\tiktok app\v1"
pnpm install
```

This installs all packages for:
- `apps/web` (Next.js frontend)
- `apps/worker` (Background worker)
- `packages/shared` (Shared code)

### Step 2: Environment Variables

**You already have `.env.local` created!** ✅

Just verify it has all required variables:
- ✅ Supabase credentials (already set)
- ⏳ YouTube API key (add when you get it)
- ⏳ TikTok credentials (add when you get them)
- ⏳ OpenRouter API key (add when you get it)
- ✅ Redis URL (localhost is fine for dev)

### Step 3: Start Redis

```powershell
# Start Redis in Docker
docker-compose up -d

# Verify Redis is running
docker ps
# Should show redis container running
```

### Step 4: Start Development Servers

**Option A: Run Everything (Recommended)**
```powershell
# From project root
pnpm dev
```

This starts:
- Next.js web app on `http://localhost:3000`
- Worker service (if configured)

**Option B: Run Separately**

Terminal 1 - Web App:
```powershell
cd apps/web
pnpm dev
# Runs on http://localhost:3000
```

Terminal 2 - Worker Service:
```powershell
cd apps/worker
pnpm dev
# Processes background jobs
```

### Step 5: Access Your App

1. Open browser: http://localhost:3000
2. You should see the login page
3. Create an account or sign in

## Troubleshooting

### Issue: "Cannot find module" errors
**Solution**: Run `pnpm install` in project root

### Issue: Redis connection failed
**Solution**: 
```powershell
# Check if Redis is running
docker ps

# If not, start it
docker-compose up -d

# Check logs
docker-compose logs redis
```

### Issue: Port 3000 already in use
**Solution**: 
```powershell
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in apps/web/package.json
# Add: "dev": "next dev -p 3001"
```

### Issue: TypeScript errors (red indicators)
**Solution**: 
1. Install Node.js if not installed
2. Run `pnpm install`
3. Restart Cursor/VS Code

## Development Workflow

1. **Make code changes**
2. **Files auto-reload** (Next.js hot reload)
3. **Check browser console** for errors
4. **Check terminal** for server logs

## Next Steps

After local setup works:
1. ✅ Test user registration/login
2. ✅ Test YouTube import flow
3. ✅ Test TikTok connection
4. ✅ Test video upload to TikTok

## Environment Variables Status

Your current `.env.local` has:
- ✅ Supabase URL and keys
- ⏳ YouTube API key (add when ready)
- ⏳ TikTok credentials (add when ready)
- ⏳ OpenRouter API key (add when ready)
- ✅ Redis URL (localhost)

## Useful Commands

```powershell
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check

# Lint code
pnpm lint

# Stop Redis
docker-compose down

# View Redis logs
docker-compose logs -f redis
```

