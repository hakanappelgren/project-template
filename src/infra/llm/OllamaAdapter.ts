import type { LLMPort, LLMOptions } from '@/domain/ports/LLMPort'

interface OllamaConfig {
  model: string
  baseUrl?: string
}

// Calls Ollama's OpenAI-compatible API running locally at http://localhost:11434.
// Data never leaves the machine — use this for sensitive data or cost-free bulk tasks.
export class OllamaAdapter implements LLMPort {
  private model: string
  private baseUrl: string

  constructor(config: OllamaConfig) {
    this.model = config.model
    this.baseUrl = config.baseUrl ?? 'http://localhost:11434'
  }

  async complete(prompt: string, options: LLMOptions = {}): Promise<string> {
    const messages = []
    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt })
    }
    messages.push({ role: 'user', content: prompt })

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: options.maxTokens,
        temperature: options.temperature ?? 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content ?? ''
  }
}
