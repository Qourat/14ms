# GitHub Repository Setup Guide

## Project Renamed to: 14ms

All references have been updated from "youtube-to-tiktok" to "14ms".

## Initial Commit & Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `14ms`
3. Description: "YouTube Shorts to TikTok Reposter - 14ms.com"
4. Choose: Private or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Add Remote and Push

After creating the repository on GitHub, run these commands:

```powershell
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/14ms.git

# Or if using SSH:
git remote add origin git@github.com:YOUR_USERNAME/14ms.git

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: 14ms project setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure Git User (if not already done)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Set Up GitHub Secrets (for CI/CD)

After pushing, go to your repository:
1. Settings → Secrets and variables → Actions
2. Add these secrets:
   - `RENDER_WEB_SERVICE_ID`
   - `RENDER_WORKER_SERVICE_ID`
   - `RENDER_API_KEY`

## Updated Project References

✅ **Package name**: `14ms`
✅ **Service names in render.yaml**: `14ms-web`, `14ms-worker`, `14ms-redis`
✅ **App titles**: Updated to "14ms"
✅ **Domain references**: Updated to `14ms.com`
✅ **Documentation**: All updated

## Next Steps After Push

1. **Install Dependencies** (when Node.js is installed):
   ```powershell
   pnpm install
   ```

2. **Set up Supabase**:
   - Create project at supabase.com
   - Run migrations in `supabase/migrations/`
   - Create storage bucket `videos`

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in all API keys

4. **Deploy to Render**:
   - Connect GitHub repo to Render
   - Use `render.yaml` for configuration
   - Set environment variables

## Repository Structure

```
14ms/
├── apps/
│   ├── web/          # Next.js frontend
│   └── worker/       # Background worker
├── packages/
│   └── shared/       # Shared code
├── supabase/
│   └── migrations/   # Database migrations
└── .github/
    └── workflows/    # CI/CD pipelines
```

