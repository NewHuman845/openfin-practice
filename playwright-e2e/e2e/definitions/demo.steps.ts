import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/world';

let page : Page;

Given('the application is running', async function (this: CustomWorld) {
// Wait for a usable page
page = this.context.pages().find(p => !p.url().includes('blank')) ?? await this.context.newPage();

// Optional: log available pages
console.log('Available pages:', this.context.pages().map(p => p.url()));

// Wait for the app to load
await page.waitForLoadState('domcontentloaded');

// Wait for the selector to appear
await page.waitForSelector('app-home p', { timeout: 60000 });
});

When('the user clicks on the {string} button', async function (message: string) {
  await page.getByText(message).click();
});

Then('the dashboard component should be visible on the screen', async function () {
var dashboardPage : Page = this.context.pages().
find((p: { url: () => string | string[]; }) => p.url().includes('dashboard'));
expect(dashboardPage).toBeDefined();
await dashboardPage!.bringToFront();
// Wait for the app to load
await dashboardPage.waitForLoadState('domcontentloaded');

// Wait for the selector to appear
await dashboardPage.waitForSelector('app-dashboard p', { timeout: 60000 });
const locator = dashboardPage.locator('app-dashboard p');
const text = await locator.textContent();

expect(text?.trim()).toBe('dashboard works!');

});


Then('the home component should be visible on the screen', async function () {

const text = await page.locator('app-home p').textContent();
expect(text?.trim()).toBe('home works!');

});
