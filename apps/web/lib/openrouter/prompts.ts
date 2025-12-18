import { OpenRouterMessage } from './client'

export function generateCaptionPrompt(
  videoTitle: string,
  videoDescription: string,
  targetPlatform: 'tiktok'
): OpenRouterMessage[] {
  return [
    {
      role: 'system',
      content: `You are a social media expert specializing in viral TikTok content. 
Your task is to create engaging captions that maximize engagement.
Keep captions concise (under 150 characters ideal), use trending language, 
include a hook or call-to-action, and maintain authenticity.`,
    },
    {
      role: 'user',
      content: `Create a TikTok caption for this video:
Title: ${videoTitle}
Description: ${videoDescription}

Provide ONLY the caption text, no explanations.`,
    },
  ]
}

export function generateHashtagsPrompt(
  videoTitle: string,
  caption: string
): OpenRouterMessage[] {
  return [
    {
      role: 'system',
      content: `You are a TikTok hashtag optimization expert.
Generate relevant hashtags that will maximize discoverability.
Mix popular hashtags with niche ones. Include trending hashtags when relevant.
Always format hashtags with # prefix.`,
    },
    {
      role: 'user',
      content: `Generate 5-8 optimal TikTok hashtags for this content:
Title: ${videoTitle}
Caption: ${caption}

Return ONLY the hashtags, space-separated, no explanations.`,
    },
  ]
}

