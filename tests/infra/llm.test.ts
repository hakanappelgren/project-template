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

describe('AnthropicAdapter', () => {
  // A fake Messages API reply; the SDK reads it through the stubbed fetch.
  function stubClaudeReply(body: object) {
    const fakeFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    )
    vi.stubGlobal('fetch', fakeFetch)
    return fakeFetch
  }

  const reply = {
    id: 'msg_1',
    type: 'message',
    role: 'assistant',
    model: 'claude-haiku-5-5',
    stop_reason: 'end_turn',
    stop_details: null,
    usage: { input_tokens: 1, output_tokens: 1 },
  }

  it('returns the text even when a thinking block comes first', async () => {
    const fakeFetch = stubClaudeReply({
      ...reply,
      content: [
        { type: 'thinking', thinking: '', signature: 'sig' },
        { type: 'text', text: 'hello' },
      ],
    })

    const text = await new AnthropicAdapter({ apiKey: 'test-key' }).complete('hi')

    expect(text).toBe('hello')
    const body = JSON.parse(fakeFetch.mock.calls[0][1].body)
    expect(body.model).toBe('claude-haiku-5-5')
    expect(body.max_tokens).toBe(4096)
  })

  it('throws a readable error when Claude declines the request', async () => {
    stubClaudeReply({
      ...reply,
      content: [],
      stop_reason: 'refusal',
      stop_details: { type: 'refusal', category: 'cyber', explanation: null },
    })
    await expect(new AnthropicAdapter({ apiKey: 'test-key' }).complete('hi')).rejects.toThrow(
      /declined.*cyber/
    )
  })
})
