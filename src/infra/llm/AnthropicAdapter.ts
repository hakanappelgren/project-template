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
    this.model = config.model ?? 'claude-haiku-5-5'
  }

  async complete(prompt: string, options: LLMOptions = {}): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      // Current Claude models think by default and thinking counts toward
      // max_tokens, so leave room for it on top of the answer.
      max_tokens: options.maxTokens ?? 4096,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })

    if (response.stop_reason === 'refusal') {
      const category = response.stop_details?.category ?? 'unspecified'
      throw new Error(`Anthropic declined the request (category: ${category})`)
    }
    // Find the answer by type, not position: a thinking block can come first.
    const block = response.content.find((b) => b.type === 'text')
    if (!block) throw new Error('Unexpected response type from Anthropic')
    return block.text
  }
}
