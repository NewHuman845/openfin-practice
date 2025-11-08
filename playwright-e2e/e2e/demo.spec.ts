import { test, expect, chromium } from '@playwright/test';

test('Connect to Chromium over CDP and test Angular app', async () => {
  // Connect to the Chromium instance via CDP
  const browser = await chromium.connectOverCDP('http://localhost:9093');

  // Use the first context (usually the default one)
  const context = browser.contexts()[0];
  const page = await context.newPage();

  // Navigate to the Angular app
  await page.goto('http://localhost:4200');

  var text = await page.locator("//app-home/p").textContent();
  expect(text).toBe("home works!")

  // Clean up
  await context.close();
});