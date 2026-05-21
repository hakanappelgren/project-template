import Anthropic from '@anthropic-ai/sdk'
import type { LLMPort, LLMOptions } from '@/domain/ports/LLMPort'

interface AnthropicConfig {
  model?: string
  apiKey?: string
}

// Calls the Anthropic API. Higher quality than Ollama for complex reasoning.
// Use for non-sensitive data only — prompts are sent to Anthropic's servers.
// If client data is involved, confirm consent before using this adapter.
export class AnthropicAdapter implements LLMPort {
  private client: Anthropic
  private model: string

  constructor(config: AnthropicConfig = {}) {
    this.client = new Anthropic({ apiKey: config.apiKey ?? process.env.ANTHROPIC_API_KEY })
    this.model = config.model ?? 'claude-haiku-4-5-20251001'
  }

  async complete(prompt: string, options: LLMOptions = {}): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: options.maxTokens ?? 1024,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })

    const block = response.content[0]
    if (block.type !== 'text') throw new Error('Unexpected response type from Anthropic')
    return block.text
  }
}
