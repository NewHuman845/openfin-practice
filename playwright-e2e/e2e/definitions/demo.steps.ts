import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';

let browser: Browser;
let context : BrowserContext;
let page : Page;

When('the application is launched', async function () {
browser = await chromium.connectOverCDP('http://localhost:9097');
context = browser.contexts()[0] ?? await browser.newContext();

// Wait for a usable page
page = context.pages().find(p => !p.url().includes('blank')) ?? await context.newPage();

// Optional: log available pages
console.log('Available pages:', context.pages().map(p => p.url()));

// Wait for the app to load
await page.waitForLoadState('domcontentloaded');

// Wait for the selector to appear
await page.waitForSelector('app-home p', { timeout: 60000 });
});

Then('the home component should be visible on the screen', async function () {

const text = await page.locator('app-home p').textContent();
expect(text?.trim()).toBe('home works!');

await context.close();

});