import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Resolve the "@/..." alias from tsconfig.json (built into Vite since v8).
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // Playwright owns tests/e2e (npm run test:e2e); Vitest can't run those specs.
    exclude: ['node_modules', 'tests/e2e/**'],
  },
})
