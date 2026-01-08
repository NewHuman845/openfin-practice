import { test, expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/world';
import { waitForOpenFinWindow } from '../../utils/waitForOpenFinWindow';

let page : Page;
let dashboardPage : Page | undefined;

Given('the application is running', async function (this: CustomWorld) {
// Wait for a usable page
page = this.context.pages().find(p => !p.url().includes('blank')) ?? await this.context.newPage();


// Wait for the app to load
await page.waitForLoadState('domcontentloaded');

// Wait for the selector to appear
await page.waitForSelector('app-home p', { timeout: 60000 });
});

When('the user clicks on the {string} button', async function (message: string) {
  dashboardPage = await waitForOpenFinWindow(this.context, 
    () => page.click("//button[text()='Open Dashboard']"), "dashboard");
});

Then('the dashboard component should be visible on the screen', async function (this: CustomWorld) {
expect(dashboardPage).toBeDefined();
await dashboardPage!.bringToFront();

// Wait for the selector to appear
await dashboardPage!.waitForSelector('app-dashboard p', { timeout: 60000 });
const locator = dashboardPage!.locator('app-dashboard p');
const text = await locator.textContent();

expect(text?.trim()).toBe('dashboard works!');

});


Then('the home component should be visible on the screen', async function () {

const text = await page.locator('app-home p').textContent();
expect(text?.trim()).toBe('home works!');

});
