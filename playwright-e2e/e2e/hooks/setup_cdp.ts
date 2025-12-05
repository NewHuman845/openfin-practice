
import { BeforeAll, Before, AfterAll } from '@cucumber/cucumber';
import { BrowserContext, chromium } from 'playwright';
import { CustomWorld } from './world';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(120 * 1000); 

let sharedContext: any;
BeforeAll(async function () {
  
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  sharedContext = browser.contexts()[0] ?? await browser.newContext();

});

Before(async function (this: CustomWorld) {
  this.context = sharedContext;
});

AfterAll(async function () {
  await sharedContext.close();
});
