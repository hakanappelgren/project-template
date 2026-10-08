import { test, expect } from '@playwright/test'

// Guards against the stylesheet reaching the browser unprocessed (e.g. a missing Tailwind PostCSS
// setup). Pages still load and behave then, so only a check on the CSS itself catches it.
test('stylesheets are processed by Tailwind', async ({ page, request }) => {
  await page.goto('/')
  const hrefs = await page
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) => links.map((l) => (l as HTMLLinkElement).href))
  expect(hrefs.length).toBeGreaterThan(0)
  for (const href of hrefs) {
    const css = await (await request.get(href)).text()
    // Unprocessed Tailwind source still contains its own directives; compiled CSS never does.
    expect(css).not.toMatch(/@theme\b|@tailwind\b/)
  }
})
