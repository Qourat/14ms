# Push 14ms Project to GitHub

## ✅ Project Renamed Successfully

All references have been updated from "youtube-to-tiktok" to "14ms":
- Package name: `14ms`
- Service names: `14ms-web`, `14ms-worker`, `14ms-redis`
- Domain references: `14ms.com`
- App titles and branding updated

## 🚀 Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `14ms`
3. **Description**: "YouTube Shorts to TikTok Reposter - 14ms.com"
4. Choose: **Private** or **Public**
5. **DO NOT** check any boxes (README, .gitignore, license) - we already have these
6. Click **"Create repository"**

### Step 2: Add Remote and Push

After creating the repository, run these commands in your project directory:

```powershell
# Navigate to project
cd "C:\Users\POWER.KEY\Downloads\tiktok app\v1"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/14ms.git

# Or if using SSH:
git remote add origin git@github.com:YOUR_USERNAME/14ms.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify Git Configuration

If you haven't set your Git user info:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📋 What's Included in the Commit

- ✅ Complete monorepo structure
- ✅ Next.js frontend application
- ✅ Worker service for background jobs
- ✅ Database migrations
- ✅ API routes and libraries
- ✅ Deployment configurations
- ✅ Documentation files
- ✅ All project files renamed to "14ms"

## 🔐 Next Steps After Push

1. **Set up GitHub Secrets** (for CI/CD):
   - Go to repository → Settings → Secrets and variables → Actions
   - Add:
     - `RENDER_WEB_SERVICE_ID`
     - `RENDER_WORKER_SERVICE_ID`
     - `RENDER_API_KEY`

2. **Install Dependencies** (when Node.js is installed):
   ```powershell
   pnpm install
   ```

3. **Set up Supabase**:
   - Create project at supabase.com
   - Run migrations from `supabase/migrations/`
   - Create storage bucket `videos`

4. **Configure Environment Variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in all API keys

5. **Deploy to Render**:
   - Connect GitHub repo to Render
   - Use `render.yaml` for configuration
   - Set environment variables

## 📝 Repository URL

After pushing, your repository will be at:
- `https://github.com/YOUR_USERNAME/14ms`

## ⚠️ Important Notes

- The initial commit has already been created locally
- Make sure you're in the correct directory before running git commands
- If you get authentication errors, you may need to set up GitHub credentials
- For SSH, ensure your SSH key is added to GitHub

