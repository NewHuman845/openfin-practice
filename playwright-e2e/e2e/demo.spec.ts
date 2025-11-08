import { test, expect, chromium } from '@playwright/test';

test('Connect to Chromium over CDP and test Angular app', async () => {
const browser = await chromium.connectOverCDP('http://localhost:9093');
const context = browser.contexts()[0] ?? await browser.newContext();

// Wait for a usable page
let page = context.pages().find(p => p.url().includes('blank'));
if (!page) {
  page = await context.newPage();
}

// Optional: log available pages
console.log('Available pages:', context.pages().map(p => p.url()));

// Wait for the app to load
await page.waitForLoadState('domcontentloaded');

// Wait for the selector to appear
await page.waitForSelector('app-home p', { timeout: 60000 });

const text = await page.locator('app-home p').textContent();
expect(text?.trim()).toBe('home works!');

await context.close();

});