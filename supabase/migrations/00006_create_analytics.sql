-- Post analytics
CREATE TABLE public.analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Metrics
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- Snapshot timestamp
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own analytics" ON public.analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON public.analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_analytics_post_id ON public.analytics(post_id);
CREATE INDEX idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX idx_analytics_recorded_at ON public.analytics(recorded_at);

-- Create a view for latest analytics per post
CREATE VIEW public.latest_analytics AS
SELECT DISTINCT ON (post_id) *
FROM public.analytics
ORDER BY post_id, recorded_at DESC;

