# Project Structure - Backend & Frontend

## 📁 Complete Folder Structure

```
14ms/
├── apps/
│   ├── web/                          # 🎨 FRONTEND + API (Next.js)
│   │   ├── app/
│   │   │   ├── (auth)/               # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── imports/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── posts/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── api/                  # 🔌 API ROUTES (Backend)
│   │   │   │   ├── youtube/
│   │   │   │   │   ├── fetch/route.ts
│   │   │   │   │   └── validate/route.ts
│   │   │   │   ├── tiktok/
│   │   │   │   │   ├── auth/route.ts
│   │   │   │   │   ├── callback/route.ts
│   │   │   │   │   └── post/route.ts
│   │   │   │   ├── ai/
│   │   │   │   │   ├── generate-caption/route.ts
│   │   │   │   │   └── optimize-hashtags/route.ts
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── create/route.ts
│   │   │   │   │   └── status/route.ts
│   │   │   │   └── webhooks/
│   │   │   │       └── supabase/route.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/               # 🧩 REACT COMPONENTS
│   │   │   └── ui/
│   │   │       ├── button.tsx
│   │   │       └── input.tsx
│   │   ├── hooks/                    # 🎣 REACT HOOKS
│   │   │   ├── use-auth.ts
│   │   │   ├── use-imports.ts
│   │   │   ├── use-posts.ts
│   │   │   ├── use-tiktok.ts
│   │   │   └── use-toast.ts
│   │   ├── lib/                      # 📚 LIBRARIES & UTILITIES
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts        # Browser client
│   │   │   │   ├── server.ts        # Server client
│   │   │   │   └── middleware.ts    # Auth middleware
│   │   │   ├── youtube/
│   │   │   │   ├── api.ts           # YouTube API client
│   │   │   │   └── validator.ts     # URL validation
│   │   │   ├── tiktok/
│   │   │   │   ├── auth.ts          # OAuth handling
│   │   │   │   └── api.ts           # TikTok API client
│   │   │   ├── openrouter/
│   │   │   │   ├── client.ts        # OpenRouter client
│   │   │   │   └── prompts.ts      # AI prompt templates
│   │   │   ├── queue/
│   │   │   │   └── client.ts        # BullMQ client
│   │   │   └── utils/
│   │   │       ├── constants.ts
│   │   │       ├── helpers.ts
│   │   │       └── validators.ts
│   │   ├── types/                    # 📘 TYPESCRIPT TYPES
│   │   │   ├── database.ts          # Supabase types
│   │   │   ├── api.ts               # API types
│   │   │   └── index.ts
│   │   ├── middleware.ts             # Next.js middleware
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── worker/                       # ⚙️ BACKEND WORKER SERVICE
│       ├── src/
│       │   ├── index.ts              # Worker entry point
│       │   ├── processors/           # 🔄 JOB PROCESSORS
│       │   │   ├── download.processor.ts
│       │   │   ├── process.processor.ts
│       │   │   └── upload.processor.ts
│       │   ├── services/             # 🛠️ BUSINESS LOGIC SERVICES
│       │   │   ├── youtube.service.ts
│       │   │   ├── tiktok.service.ts
│       │   │   ├── storage.service.ts
│       │   │   └── ai.service.ts
│       │   ├── lib/                   # 📚 SHARED LIBRARIES
│       │   │   ├── supabase.ts
│       │   │   ├── redis.ts
│       │   │   ├── tiktok/
│       │   │   │   ├── auth.ts
│       │   │   │   └── api.ts
│       │   │   └── openrouter.ts
│       │   └── types/
│       │       └── jobs.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                       # 📦 SHARED PACKAGE
│       ├── src/
│       │   ├── constants.ts
│       │   ├── types.ts
│       │   ├── validators.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── supabase/
│   └── migrations/                   # 🗄️ DATABASE MIGRATIONS
│       ├── 00001_create_users_profile.sql
│       ├── 00002_create_tiktok_accounts.sql
│       ├── 00003_create_imports.sql
│       ├── 00004_create_posts.sql
│       ├── 00005_create_jobs.sql
│       └── 00006_create_analytics.sql
│
├── .github/
│   └── workflows/                     # 🚀 CI/CD
│       ├── deploy-web.yml
│       └── deploy-worker.yml
│
├── package.json                      # Root package.json
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml               # pnpm workspace config
├── render.yaml                       # Render deployment config
├── docker-compose.yml                # Local Redis
└── README.md
```

---

## 🎨 Frontend Structure (`apps/web`)

### Pages & Routes
- **Auth Routes** (`app/(auth)/`): Login, Register
- **Dashboard Routes** (`app/(dashboard)/`): Dashboard, Imports, Posts, Settings, Analytics
- **API Routes** (`app/api/`): All backend API endpoints

### Components
- **UI Components** (`components/ui/`): Reusable UI elements (Button, Input, etc.)
- **Feature Components**: To be added (ImportForm, PostEditor, etc.)

### Hooks
- `use-auth.ts`: Authentication state management
- `use-imports.ts`: YouTube import operations
- `use-posts.ts`: TikTok post management
- `use-tiktok.ts`: TikTok account connection
- `use-toast.ts`: Toast notifications

### Libraries
- **Supabase**: Client, server, and middleware
- **YouTube**: API client and validation
- **TikTok**: OAuth and API client
- **OpenRouter**: AI client and prompts
- **Queue**: BullMQ client for job management

---

## ⚙️ Backend Structure (`apps/worker`)

### Processors
- **download.processor.ts**: Downloads YouTube videos
- **process.processor.ts**: Processes videos with AI
- **upload.processor.ts**: Uploads to TikTok

### Services
- **youtube.service.ts**: YouTube video operations
- **tiktok.service.ts**: TikTok upload operations
- **storage.service.ts**: Supabase Storage operations
- **ai.service.ts**: AI caption/hashtag generation

### Libraries
- **Supabase**: Database client
- **Redis**: Queue connection
- **TikTok**: API client for worker
- **OpenRouter**: AI client for worker

---

## 🔌 API Routes (Backend in `apps/web/app/api`)

### YouTube API
- `GET /api/youtube/fetch` - Fetch video metadata
- `POST /api/youtube/validate` - Validate YouTube URL

### TikTok API
- `GET /api/tiktok/auth` - Generate OAuth URL
- `GET /api/tiktok/callback` - Handle OAuth callback
- `POST /api/tiktok/post` - Queue TikTok post

### AI API
- `POST /api/ai/generate-caption` - Generate AI caption
- `POST /api/ai/optimize-hashtags` - Optimize hashtags

### Jobs API
- `POST /api/jobs/create` - Create background job
- `GET /api/jobs/status` - Get job status

### Webhooks
- `POST /api/webhooks/supabase` - Supabase webhook handler

---

## 🗄️ Database Schema

1. **profiles** - User profiles
2. **tiktok_accounts** - Connected TikTok accounts
3. **imports** - YouTube video imports
4. **posts** - TikTok posts
5. **jobs** - Background jobs
6. **analytics** - Post analytics

---

## 📦 Shared Package

Common code shared between web and worker:
- Constants
- Types
- Validators

---

## 🚀 Deployment

- **Render.com**: Web service + Worker service + Redis
- **GitHub Actions**: Auto-deploy on push
- **Docker Compose**: Local Redis for development

