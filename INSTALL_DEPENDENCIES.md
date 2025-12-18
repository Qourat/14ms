# Install Dependencies Guide

## Issue
TypeScript errors showing "Cannot find module 'react'" indicate that dependencies haven't been installed yet.

## Solution

### Step 1: Install Node.js (if not installed)

1. Download Node.js from: https://nodejs.org/
2. Install the LTS version (recommended)
3. Restart your terminal/IDE after installation

### Step 2: Install pnpm (Package Manager)

Open PowerShell or Command Prompt and run:

```powershell
npm install -g pnpm
```

Or using the standalone installer:
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

### Step 3: Install Project Dependencies

Navigate to the project root and run:

```powershell
cd "C:\Users\POWER.KEY\Downloads\tiktok app\v1"
pnpm install
```

This will install all dependencies for:
- `apps/web` (Next.js frontend)
- `apps/worker` (Background worker)
- `packages/shared` (Shared package)

### Step 4: Verify Installation

After installation completes, the TypeScript errors should disappear. If they persist:

1. Restart Cursor/VS Code
2. Reload the window: `Ctrl+Shift+P` → "Developer: Reload Window"
3. Check that `node_modules` folders exist in:
   - `apps/web/node_modules`
   - `apps/worker/node_modules`

### Alternative: Use npm instead of pnpm

If you prefer npm:

```powershell
# Install dependencies
npm install

# This will install all packages in the monorepo
```

### Troubleshooting

**If pnpm/npm commands are not recognized:**
- Make sure Node.js is installed and added to PATH
- Restart your terminal/IDE after installing Node.js
- Check PATH: `$env:PATH` in PowerShell

**If installation fails:**
- Check your internet connection
- Try clearing cache: `pnpm store prune` or `npm cache clean --force`
- Delete `node_modules` folders and `pnpm-lock.yaml`/`package-lock.json` and try again

