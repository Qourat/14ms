export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro' | 'enterprise'
          monthly_post_count: number
          monthly_post_limit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          monthly_post_count?: number
          monthly_post_limit?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'enterprise'
          monthly_post_count?: number
          monthly_post_limit?: number
          created_at?: string
          updated_at?: string
        }
      }
      tiktok_accounts: {
        Row: {
          id: string
          user_id: string
          tiktok_user_id: string
          tiktok_username: string
          display_name: string | null
          avatar_url: string | null
          access_token: string
          refresh_token: string
          token_expires_at: string
          scopes: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tiktok_user_id: string
          tiktok_username: string
          display_name?: string | null
          avatar_url?: string | null
          access_token: string
          refresh_token: string
          token_expires_at: string
          scopes?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tiktok_user_id?: string
          tiktok_username?: string
          display_name?: string | null
          avatar_url?: string | null
          access_token?: string
          refresh_token?: string
          token_expires_at?: string
          scopes?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      imports: {
        Row: {
          id: string
          user_id: string
          youtube_url: string
          youtube_video_id: string
          youtube_title: string | null
          youtube_description: string | null
          youtube_thumbnail_url: string | null
          youtube_duration: number | null
          youtube_channel_name: string | null
          youtube_channel_id: string | null
          storage_path: string | null
          file_size: number | null
          status: 'pending' | 'downloading' | 'processing' | 'ready' | 'failed'
          error_message: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          youtube_url: string
          youtube_video_id: string
          youtube_title?: string | null
          youtube_description?: string | null
          youtube_thumbnail_url?: string | null
          youtube_duration?: number | null
          youtube_channel_name?: string | null
          youtube_channel_id?: string | null
          storage_path?: string | null
          file_size?: number | null
          status?: 'pending' | 'downloading' | 'processing' | 'ready' | 'failed'
          error_message?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          youtube_url?: string
          youtube_video_id?: string
          youtube_title?: string | null
          youtube_description?: string | null
          youtube_thumbnail_url?: string | null
          youtube_duration?: number | null
          youtube_channel_name?: string | null
          youtube_channel_id?: string | null
          storage_path?: string | null
          file_size?: number | null
          status?: 'pending' | 'downloading' | 'processing' | 'ready' | 'failed'
          error_message?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          import_id: string
          tiktok_account_id: string
          caption: string | null
          hashtags: string[]
          ai_generated_caption: string | null
          ai_generated_hashtags: string[]
          privacy_level: 'public' | 'friends' | 'private'
          allow_comments: boolean
          allow_duet: boolean
          allow_stitch: boolean
          scheduled_at: string | null
          status: 'draft' | 'scheduled' | 'uploading' | 'published' | 'failed'
          tiktok_video_id: string | null
          tiktok_share_url: string | null
          error_message: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          import_id: string
          tiktok_account_id: string
          caption?: string | null
          hashtags?: string[]
          ai_generated_caption?: string | null
          ai_generated_hashtags?: string[]
          privacy_level?: 'public' | 'friends' | 'private'
          allow_comments?: boolean
          allow_duet?: boolean
          allow_stitch?: boolean
          scheduled_at?: string | null
          status?: 'draft' | 'scheduled' | 'uploading' | 'published' | 'failed'
          tiktok_video_id?: string | null
          tiktok_share_url?: string | null
          error_message?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          import_id?: string
          tiktok_account_id?: string
          caption?: string | null
          hashtags?: string[]
          ai_generated_caption?: string | null
          ai_generated_hashtags?: string[]
          privacy_level?: 'public' | 'friends' | 'private'
          allow_comments?: boolean
          allow_duet?: boolean
          allow_stitch?: boolean
          scheduled_at?: string | null
          status?: 'draft' | 'scheduled' | 'uploading' | 'published' | 'failed'
          tiktok_video_id?: string | null
          tiktok_share_url?: string | null
          error_message?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          type: 'download' | 'process' | 'upload' | 'ai_caption'
          reference_id: string | null
          reference_type: 'import' | 'post' | null
          status: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled'
          progress: number
          result: Json
          error_message: string | null
          attempts: number
          max_attempts: number
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'download' | 'process' | 'upload' | 'ai_caption'
          reference_id?: string | null
          reference_type?: 'import' | 'post' | null
          status?: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled'
          progress?: number
          result?: Json
          error_message?: string | null
          attempts?: number
          max_attempts?: number
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'download' | 'process' | 'upload' | 'ai_caption'
          reference_id?: string | null
          reference_type?: 'import' | 'post' | null
          status?: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled'
          progress?: number
          result?: Json
          error_message?: string | null
          attempts?: number
          max_attempts?: number
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          post_id: string
          user_id: string
          views: number
          likes: number
          comments: number
          shares: number
          recorded_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          views?: number
          likes?: number
          comments?: number
          shares?: number
          recorded_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          views?: number
          likes?: number
          comments?: number
          shares?: number
          recorded_at?: string
        }
      }
    }
    Views: {
      latest_analytics: {
        Row: {
          id: string
          post_id: string
          user_id: string
          views: number
          likes: number
          comments: number
          shares: number
          recorded_at: string
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

