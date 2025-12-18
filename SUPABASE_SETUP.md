# Supabase Database Setup Guide

Complete step-by-step instructions for setting up the 14ms database in Supabase.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Access to your Supabase project dashboard

---

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Sign in with your account

2. **Create New Project**
   - Click **"New Project"** button
   - Fill in the project details:
     - **Name**: `14ms` (or your preferred name)
     - **Database Password**: Create a strong password (save this securely!)
     - **Region**: Choose the closest region to your users
     - **Pricing Plan**: Select Free tier for development
   - Click **"Create new project"**

3. **Wait for Project Setup**
   - This takes 1-2 minutes
   - You'll see a loading screen with progress

---

## Step 2: Get Project Credentials

1. **Navigate to Project Settings**
   - In your project dashboard, click **"Settings"** (gear icon) in the left sidebar
   - Click **"API"** under Project Settings

2. **Copy Important Credentials**
   You'll need these for your `.env.local` file:
   - **Project URL**: Found under "Project URL"
     - Example: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: Found under "Project API keys" → "anon public"
     - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: Found under "Project API keys" → "service_role"
     - This is your `SUPABASE_SERVICE_ROLE_KEY`
     - ⚠️ **Keep this secret!** Never expose it in client-side code

3. **Save These Values**
   - Copy them to a secure location
   - You'll add them to your `.env.local` file later

---

## Step 3: Run Database Migrations

### Option A: Using Supabase SQL Editor (Recommended)

1. **Open SQL Editor**
   - In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
   - Click **"New query"**

2. **Run Migrations in Order**
   
   **Migration 1: Create Users Profile**
   - Open the file: `supabase/migrations/00001_create_users_profile.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **"Run"** (or press `Ctrl+Enter`)
   - Wait for success message: "Success. No rows returned"

   **Migration 2: Create TikTok Accounts**
   - Open: `supabase/migrations/00002_create_tiktok_accounts.sql`
   - Copy and paste into SQL Editor
   - Click **"Run"**
   - Verify success

   **Migration 3: Create Imports**
   - Open: `supabase/migrations/00003_create_imports.sql`
   - Copy and paste into SQL Editor
   - Click **"Run"**
   - Verify success

   **Migration 4: Create Posts**
   - Open: `supabase/migrations/00004_create_posts.sql`
   - Copy and paste into SQL Editor
   - Click **"Run"**
   - Verify success

   **Migration 5: Create Jobs**
   - Open: `supabase/migrations/00005_create_jobs.sql`
   - Copy and paste into SQL Editor
   - Click **"Run"**
   - Verify success

   **Migration 6: Create Analytics**
   - Open: `supabase/migrations/00006_create_analytics.sql`
   - Copy and paste into SQL Editor
   - Click **"Run"**
   - Verify success

3. **Verify Tables Created**
   - Click **"Table Editor"** in the left sidebar
   - You should see these tables:
     - ✅ `profiles`
     - ✅ `tiktok_accounts`
     - ✅ `imports`
     - ✅ `posts`
     - ✅ `jobs`
     - ✅ `analytics`

### Option B: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push
```

---

## Step 4: Create Storage Bucket

1. **Navigate to Storage**
   - In Supabase dashboard, click **"Storage"** in the left sidebar

2. **Create New Bucket**
   - Click **"New bucket"** button
   - Fill in details:
     - **Name**: `videos` (exact name required)
     - **Public bucket**: ✅ **Check this** (allows public access to videos)
     - **File size limit**: Set to `100 MB` or higher
     - **Allowed MIME types**: Leave empty or add `video/mp4`
   - Click **"Create bucket"**

3. **Configure Bucket Policies**
   - Click on the `videos` bucket you just created
   - Click **"Policies"** tab
   - Click **"New Policy"**

   **Policy 1: Allow Authenticated Users to Upload**
   - Policy name: `Allow authenticated uploads`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'videos'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 2: Allow Authenticated Users to Read**
   - Policy name: `Allow authenticated reads`
   - Allowed operation: `SELECT`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'videos'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 3: Allow Users to Delete Their Own Files**
   - Policy name: `Allow users to delete own files`
   - Allowed operation: `DELETE`
   - Target roles: `authenticated`
   - Policy definition:
     ```sql
     (bucket_id = 'videos'::text) AND (auth.role() = 'authenticated'::text)
     ```

   **Policy 4: Allow Public Read Access** (if bucket is public)
   - Policy name: `Allow public reads`
   - Allowed operation: `SELECT`
   - Target roles: `anon`, `authenticated`
   - Policy definition:
     ```sql
     bucket_id = 'videos'::text
     ```

---

## Step 5: Verify Row Level Security (RLS)

1. **Check RLS Status**
   - Go to **"Table Editor"**
   - Click on each table
   - Verify that **"Enable RLS"** is checked (green toggle)

2. **Verify Policies**
   - Go to **"Authentication"** → **"Policies"**
   - You should see policies for each table:
     - `profiles`: Users can view/update own profile
     - `tiktok_accounts`: Users can manage own accounts
     - `imports`: Users can manage own imports
     - `posts`: Users can manage own posts
     - `jobs`: Users can view own jobs
     - `analytics`: Users can view own analytics

---

## Step 6: Configure Environment Variables

1. **Create `.env.local` File**
   - In your project root, create `.env.local` (if it doesn't exist)
   - Copy from `.env.example` if available

2. **Add Supabase Credentials**
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Replace with Your Values**
   - Use the credentials you copied in Step 2
   - Make sure there are no extra spaces or quotes

---

## Step 7: Test Database Connection

1. **Test from Your App**
   - Start your development server:
     ```bash
     pnpm dev
     ```
   - Try to sign up/create an account
   - Check Supabase dashboard → **"Table Editor"** → `profiles`
   - You should see a new profile record

2. **Verify Storage Works**
   - Try uploading a test file
   - Check **"Storage"** → `videos` bucket
   - File should appear there

---

## Step 8: Enable Email Authentication (Optional)

1. **Configure Email Settings**
   - Go to **"Authentication"** → **"Providers"**
   - Click on **"Email"**
   - Enable **"Enable email provider"**
   - Configure email templates if needed

2. **Set Up SMTP** (for production)
   - Go to **"Settings"** → **"Auth"**
   - Scroll to **"SMTP Settings"**
   - Configure your email service (SendGrid, Mailgun, etc.)

---

## Troubleshooting

### Issue: Migration Fails
- **Solution**: Make sure you're running migrations in order (00001, 00002, etc.)
- Check for error messages in SQL Editor
- Verify you have the correct permissions

### Issue: Tables Not Appearing
- **Solution**: Refresh the Table Editor
- Check if migrations ran successfully (green checkmark)
- Verify you're in the correct project

### Issue: Storage Upload Fails
- **Solution**: 
  - Verify bucket name is exactly `videos`
  - Check bucket policies are set correctly
  - Ensure RLS is enabled on the bucket
  - Check file size limits

### Issue: RLS Blocking Access
- **Solution**:
  - Verify user is authenticated
  - Check policies are correctly configured
  - Ensure user_id matches in policies

### Issue: Can't Find Service Role Key
- **Solution**:
  - Go to Settings → API
  - Look under "Project API keys"
  - Click "Reveal" next to service_role key
  - Copy the key (starts with `eyJ...`)

---

## Verification Checklist

After setup, verify:

- [ ] All 6 migrations ran successfully
- [ ] All 6 tables appear in Table Editor
- [ ] `videos` storage bucket created
- [ ] Storage bucket policies configured
- [ ] RLS enabled on all tables
- [ ] Environment variables added to `.env.local`
- [ ] Can create a test user account
- [ ] Can upload a test file to storage
- [ ] Service role key saved securely

---

## Next Steps

After database setup is complete:

1. **Install Dependencies**: `pnpm install`
2. **Configure Other APIs**: YouTube, TikTok, OpenRouter
3. **Start Development**: `pnpm dev`
4. **Test Full Flow**: Import → Process → Post to TikTok

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/tables)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Review error messages in SQL Editor
3. Verify all credentials are correct
4. Check Supabase status page: https://status.supabase.com

