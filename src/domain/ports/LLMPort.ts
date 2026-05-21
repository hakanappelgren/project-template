// Port interface for LLM providers. Implementations live in infra/llm/.
// The domain and application layers only depend on this interface, never on
// a specific provider — enabling swapping Ollama ↔ Anthropic via env var.

export interface LLMOptions {
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
}

export interface LLMPort {
  complete(prompt: string, options?: LLMOptions): Promise<string>
}
