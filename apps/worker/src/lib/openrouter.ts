const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterOptions {
  model?: string
  temperature?: number
  max_tokens?: number
}

export async function chat(
  messages: OpenRouterMessage[],
  options: OpenRouterOptions = {}
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY
  
  if (!apiKey) {
    throw new Error('OpenRouter API key not configured')
  }
  
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.APP_URL || 'https://14ms.com',
      'X-Title': '14ms - YouTube to TikTok Reposter',
    },
    body: JSON.stringify({
      model: options.model || 'anthropic/claude-3.5-sonnet',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 500,
    }),
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'OpenRouter API error' }))
    throw new Error(error.message || 'OpenRouter API error')
  }
  
  const data = await response.json()
  return data.choices[0].message.content
}

