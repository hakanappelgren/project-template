// @vitest-environment node
// Server-side code: the Anthropic SDK refuses to start in a browser-like (jsdom) environment.
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AnthropicAdapter, OllamaAdapter, createLLM } from '@/infra/llm'

// Example of the "infra adapters → test with fake dependencies" rule:
// no real LLM is called — the network is replaced by a fake fetch.

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('createLLM', () => {
  it('defaults to the local Ollama adapter so data stays on the machine', () => {
    vi.stubEnv('LLM_PROVIDER', '')
    expect(createLLM()).toBeInstanceOf(OllamaAdapter)
  })

  it('returns the Anthropic adapter when LLM_PROVIDER=anthropic', () => {
    vi.stubEnv('LLM_PROVIDER', 'anthropic')
    vi.stubEnv('ANTHROPIC_API_KEY', 'test-key')
    expect(createLLM()).toBeInstanceOf(AnthropicAdapter)
  })
})

describe('OllamaAdapter', () => {
  it('sends the system and user prompt and returns the reply text', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'hello' } }] }),
    })
    vi.stubGlobal('fetch', fakeFetch)

    const reply = await new OllamaAdapter({ model: 'm' }).complete('hi', {
      systemPrompt: 'be brief',
    })

    expect(reply).toBe('hello')
    const body = JSON.parse(fakeFetch.mock.calls[0][1].body)
    expect(body.messages).toEqual([
      { role: 'system', content: 'be brief' },
      { role: 'user', content: 'hi' },
    ])
  })

  it('throws a readable error when Ollama answers with an error status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' })
    )
    await expect(new OllamaAdapter({ model: 'm' }).complete('hi')).rejects.toThrow(
      'Ollama request failed: 500'
    )
  })
})
