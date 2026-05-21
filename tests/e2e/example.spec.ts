import { test, expect } from '@playwright/test'

// Replace this with your real E2E tests.
// Each flow in docs/flow/flows.json should have at least one E2E test here.
// Run: npm run test:e2e
// UI mode: npm run test:e2e -- --ui

test('home page loads', async ({ page }) => {
  await page.goto('/')
  // Replace with a real assertion about your app's home page
  await expect(page).toHaveTitle(//)
})
