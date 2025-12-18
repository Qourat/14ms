-- TikTok posts
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    import_id UUID NOT NULL REFERENCES public.imports(id) ON DELETE CASCADE,
    tiktok_account_id UUID NOT NULL REFERENCES public.tiktok_accounts(id) ON DELETE CASCADE,
    
    -- Content
    caption TEXT,
    hashtags TEXT[] DEFAULT '{}',
    ai_generated_caption TEXT,
    ai_generated_hashtags TEXT[] DEFAULT '{}',
    
    -- TikTok specific settings
    privacy_level TEXT DEFAULT 'public' CHECK (privacy_level IN ('public', 'friends', 'private')),
    allow_comments BOOLEAN DEFAULT true,
    allow_duet BOOLEAN DEFAULT true,
    allow_stitch BOOLEAN DEFAULT true,
    
    -- Scheduling
    scheduled_at TIMESTAMPTZ,
    
    -- Status tracking
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'uploading', 'published', 'failed')),
    tiktok_video_id TEXT,
    tiktok_share_url TEXT,
    error_message TEXT,
    
    -- Timestamps
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own posts" ON public.posts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.posts
    FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_import_id ON public.posts(import_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_scheduled_at ON public.posts(scheduled_at) WHERE scheduled_at IS NOT NULL;

