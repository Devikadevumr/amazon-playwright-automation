const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Verify the page title contains Playwright
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the Get started link
  await page.getByRole('link', { name: 'Get started' }).click();

  // Verify the Installation heading is visible
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});