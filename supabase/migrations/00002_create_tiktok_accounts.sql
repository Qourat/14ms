-- TikTok connected accounts
CREATE TABLE public.tiktok_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tiktok_user_id TEXT NOT NULL,
    tiktok_username TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    token_expires_at TIMESTAMPTZ NOT NULL,
    scopes TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, tiktok_user_id)
);

-- Enable RLS
ALTER TABLE public.tiktok_accounts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own TikTok accounts" ON public.tiktok_accounts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own TikTok accounts" ON public.tiktok_accounts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own TikTok accounts" ON public.tiktok_accounts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own TikTok accounts" ON public.tiktok_accounts
    FOR DELETE USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_tiktok_accounts_user_id ON public.tiktok_accounts(user_id);

