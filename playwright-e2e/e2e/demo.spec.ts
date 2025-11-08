import {test,expect} from '@playwright/test'


test('demo', async ({ page }) => {
    await page.setDefaultTimeout(60000);
    await page.goto('https://www.google.com/');

    var title = await page.locator("//title").textContent()
    expect(title).toBe('Google')

});
