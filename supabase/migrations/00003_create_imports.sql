-- YouTube imports
CREATE TABLE public.imports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    youtube_url TEXT NOT NULL,
    youtube_video_id TEXT NOT NULL,
    youtube_title TEXT,
    youtube_description TEXT,
    youtube_thumbnail_url TEXT,
    youtube_duration INTEGER, -- in seconds
    youtube_channel_name TEXT,
    youtube_channel_id TEXT,
    storage_path TEXT, -- Supabase storage path
    file_size BIGINT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'downloading', 'processing', 'ready', 'failed')),
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.imports ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own imports" ON public.imports
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own imports" ON public.imports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own imports" ON public.imports
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own imports" ON public.imports
    FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_imports_user_id ON public.imports(user_id);
CREATE INDEX idx_imports_status ON public.imports(status);
CREATE INDEX idx_imports_youtube_video_id ON public.imports(youtube_video_id);

