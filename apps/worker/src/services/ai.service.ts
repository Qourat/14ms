import { chat } from '../lib/openrouter'

export async function generateCaption(
  title: string,
  description: string
): Promise<string> {
  const messages = [
    {
      role: 'system' as const,
      content: `You are a social media expert specializing in viral TikTok content. 
Your task is to create engaging captions that maximize engagement.
Keep captions concise (under 150 characters ideal), use trending language, 
include a hook or call-to-action, and maintain authenticity.`,
    },
    {
      role: 'user' as const,
      content: `Create a TikTok caption for this video:
Title: ${title}
Description: ${description}

Provide ONLY the caption text, no explanations.`,
    },
  ]

  return await chat(messages)
}

export async function generateHashtags(
  title: string,
  caption: string
): Promise<string[]> {
  const messages = [
    {
      role: 'system' as const,
      content: `You are a TikTok hashtag optimization expert.
Generate relevant hashtags that will maximize discoverability.
Mix popular hashtags with niche ones. Include trending hashtags when relevant.
Always format hashtags with # prefix.`,
    },
    {
      role: 'user' as const,
      content: `Generate 5-8 optimal TikTok hashtags for this content:
Title: ${title}
Caption: ${caption}

Return ONLY the hashtags, space-separated, no explanations.`,
    },
  ]

  const response = await chat(messages)
  return response
    .split(/\s+/)
    .filter((tag) => tag.startsWith('#'))
    .slice(0, 8)
}

