import { test, expect } from '@playwright/test'

// Guards against Tailwind not being compiled (e.g. a missing PostCSS setup). Pages still load and
// behave then, so only a check on the CSS itself catches it. Depending on the Next.js version the
// stylesheet is either served raw or dropped entirely, so we check both: compiled Tailwind must be
// present (its base styles always define --default-font-family), and no raw Tailwind directives
// may be left (raw source can contain that variable name too).
test('stylesheets are compiled by Tailwind', async ({ page, request }) => {
  await page.goto('/')
  const hrefs = await page
    .locator('link[rel="stylesheet"]')
    .evaluateAll((links) => links.map((l) => (l as HTMLLinkElement).href))
  const sheets = await Promise.all(hrefs.map(async (href) => (await request.get(href)).text()))

  expect(sheets.some((css) => css.includes('--default-font-family'))).toBe(true)
  for (const css of sheets) expect(css).not.toMatch(/@theme\b|@tailwind\b/)
})
