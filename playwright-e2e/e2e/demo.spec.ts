import { test, expect, chromium } from '@playwright/test';

test('Connect to Chromium over CDP and test Angular app', async () => {
  // Connect to the Chromium instance via CDP
  const browser = await chromium.connectOverCDP('http://localhost:9093');

  var context = browser.contexts()[0] ?? browser.newContext()
  var page = await context.pages()[0] ?? await context.newPage()
  await page.waitForSelector('//app-home/p', { timeout: 50000 });

   var text = await page.locator("//app-home/p").textContent();
   expect(text).toBe("home works!")
  // Clean up
  await context.close();
});