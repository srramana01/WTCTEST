import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Kickoff smoke test. Phase 1 replaces this with the full homepage suite.
test('placeholder page renders, is not cached, and has no WCAG A/AA violations', async ({
  page,
}) => {
  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  expect(response.headers()['cache-control']).toBe('no-store');
  await expect(page.getByText('WinningThruChange build in progress')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('no horizontal scroll', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
