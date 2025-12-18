# 📁 Complete Folder Structure

## 🎨 Frontend (`apps/web/`)

```
apps/web/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # 🔐 Authentication Pages
│   │   ├── layout.tsx               # Auth layout wrapper
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   └── register/
│   │       └── page.tsx             # Registration page
│   │
│   ├── (dashboard)/                  # 📊 Dashboard Pages (Protected)
│   │   ├── layout.tsx               # Dashboard layout with nav
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Main dashboard
│   │   ├── imports/
│   │   │   └── page.tsx             # YouTube imports page
│   │   ├── posts/
│   │   │   └── page.tsx             # TikTok posts page
│   │   ├── settings/
│   │   │   └── page.tsx             # Settings page
│   │   └── analytics/
│   │       └── page.tsx             # Analytics page
│   │
│   ├── api/                          # 🔌 API Routes (Backend)
│   │   ├── youtube/
│   │   │   ├── fetch/
│   │   │   │   └── route.ts        # Fetch YouTube video info
│   │   │   └── validate/
│   │   │       └── route.ts        # Validate YouTube URL
│   │   │
│   │   ├── tiktok/
│   │   │   ├── auth/
│   │   │   │   └── route.ts        # Generate TikTok OAuth URL
│   │   │   ├── callback/
│   │   │   │   └── route.ts        # Handle OAuth callback
│   │   │   └── post/
│   │   │       └── route.ts        # Queue TikTok post
│   │   │
│   │   ├── ai/
│   │   │   ├── generate-caption/
│   │   │   │   └── route.ts        # Generate AI caption
│   │   │   └── optimize-hashtags/
│   │   │       └── route.ts        # Optimize hashtags
│   │   │
│   │   ├── jobs/
│   │   │   ├── create/
│   │   │   │   └── route.ts        # Create background job
│   │   │   └── status/
│   │   │       └── route.ts        # Get job status
│   │   │
│   │   └── webhooks/
│   │       └── supabase/
│   │           └── route.ts        # Supabase webhook handler
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page (redirects)
│   └── globals.css                   # Global styles
│
├── components/                       # 🧩 React Components
│   └── ui/                          # Reusable UI components
│       ├── button.tsx               # Button component
│       └── input.tsx                # Input component
│
├── hooks/                            # 🎣 React Hooks
│   ├── use-auth.ts                  # Authentication hook
│   ├── use-imports.ts               # YouTube imports hook
│   ├── use-posts.ts                 # TikTok posts hook
│   ├── use-tiktok.ts                # TikTok account hook
│   └── use-toast.ts                 # Toast notifications hook
│
├── lib/                              # 📚 Libraries & Utilities
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts                # Server Supabase client
│   │   └── middleware.ts            # Auth middleware
│   │
│   ├── youtube/
│   │   ├── api.ts                  # YouTube API client
│   │   └── validator.ts            # URL validation
│   │
│   ├── tiktok/
│   │   ├── auth.ts                 # TikTok OAuth
│   │   └── api.ts                  # TikTok API client
│   │
│   ├── openrouter/
│   │   ├── client.ts               # OpenRouter API client
│   │   └── prompts.ts             # AI prompt templates
│   │
│   ├── queue/
│   │   └── client.ts               # BullMQ queue client
│   │
│   └── utils/
│       ├── constants.ts            # Constants
│       ├── helpers.ts               # Helper functions
│       └── validators.ts            # Validation schemas
│
├── types/                            # 📘 TypeScript Types
│   ├── database.ts                  # Supabase database types
│   ├── api.ts                       # API request/response types
│   └── index.ts                     # Type exports
│
├── middleware.ts                     # Next.js middleware (auth)
├── next.config.js                   # Next.js config
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies
```

---

## ⚙️ Backend Worker (`apps/worker/`)

```
apps/worker/
├── src/
│   ├── index.ts                     # 🚀 Worker entry point
│   │
│   ├── processors/                  # 🔄 Job Processors
│   │   ├── download.processor.ts   # Download YouTube videos
│   │   ├── process.processor.ts     # Process videos with AI
│   │   └── upload.processor.ts     # Upload to TikTok
│   │
│   ├── services/                    # 🛠️ Business Logic Services
│   │   ├── youtube.service.ts      # YouTube operations
│   │   ├── tiktok.service.ts       # TikTok upload operations
│   │   ├── storage.service.ts      # Supabase Storage operations
│   │   └── ai.service.ts           # AI caption/hashtag generation
│   │
│   ├── lib/                         # 📚 Shared Libraries
│   │   ├── supabase.ts             # Supabase client
│   │   ├── redis.ts                # Redis client
│   │   ├── openrouter.ts           # OpenRouter AI client
│   │   └── tiktok/
│   │       ├── auth.ts             # Token refresh
│   │       └── api.ts              # TikTok API
│   │
│   └── types/
│       └── jobs.ts                 # Job type definitions
│
├── tsconfig.json                     # TypeScript config
└── package.json                     # Dependencies
```

---

## 📦 Shared Package (`packages/shared/`)

```
packages/shared/
├── src/
│   ├── constants.ts                 # Shared constants
│   ├── types.ts                     # Shared types
│   ├── validators.ts                # Shared validators
│   └── index.ts                     # Package exports
├── tsconfig.json
└── package.json
```

---

## 🗄️ Database (`supabase/`)

```
supabase/
└── migrations/
    ├── 00001_create_users_profile.sql
    ├── 00002_create_tiktok_accounts.sql
    ├── 00003_create_imports.sql
    ├── 00004_create_posts.sql
    ├── 00005_create_jobs.sql
    └── 00006_create_analytics.sql
```

---

## 🚀 Deployment (`.github/`)

```
.github/
└── workflows/
    ├── deploy-web.yml               # Deploy web service
    └── deploy-worker.yml             # Deploy worker service
```

---

## 📋 Root Files

```
.
├── package.json                      # Root package.json (monorepo)
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml               # pnpm workspace config
├── render.yaml                       # Render.com deployment config
├── docker-compose.yml                # Local Redis setup
├── .gitignore
├── README.md
├── QUICKSTART.md
├── PROJECT_STRUCTURE.md
└── FOLDER_STRUCTURE.md
```

---

## 📊 Summary

### Frontend (`apps/web`)
- **Pages**: 7 pages (auth + dashboard)
- **API Routes**: 9 API endpoints
- **Components**: 2 UI components (more to be added)
- **Hooks**: 5 React hooks
- **Libraries**: 6 library modules

### Backend (`apps/worker`)
- **Processors**: 3 job processors
- **Services**: 4 business logic services
- **Libraries**: 4 shared libraries

### Database
- **Migrations**: 6 SQL migration files
- **Tables**: 6 main tables (profiles, tiktok_accounts, imports, posts, jobs, analytics)

### Total Files
- **Frontend**: ~40+ files
- **Backend**: ~15+ files
- **Shared**: 4 files
- **Database**: 6 migrations
- **Config**: 10+ config files

