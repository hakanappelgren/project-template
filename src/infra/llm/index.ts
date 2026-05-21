import type { LLMPort } from '@/domain/ports/LLMPort'
import { OllamaAdapter } from './OllamaAdapter'
import { AnthropicAdapter } from './AnthropicAdapter'

// Returns the configured LLM adapter based on LLM_PROVIDER env var.
// Default: Ollama (local, free, private).
// Set LLM_PROVIDER=anthropic for cloud-based inference.
export function createLLM(): LLMPort {
  const provider = process.env.LLM_PROVIDER ?? 'ollama'

  if (provider === 'anthropic') {
    return new AnthropicAdapter({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-haiku-4-5-20251001',
    })
  }

  return new OllamaAdapter({
    model: process.env.OLLAMA_MODEL ?? 'llama3.2',
    baseUrl: process.env.OLLAMA_BASE_URL,
  })
}

export { OllamaAdapter, AnthropicAdapter }
export type { LLMPort }
