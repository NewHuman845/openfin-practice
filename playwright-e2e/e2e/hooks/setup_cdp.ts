
import { BeforeAll, Before, AfterAll } from '@cucumber/cucumber';
import { BrowserContext, chromium } from 'playwright';
import { CustomWorld } from './world';
import { Utils } from '../utils/waitForCdp';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000); // 60 seconds

let sharedContext! : BrowserContext;

BeforeAll(async function () {
    var utils = new Utils();
    console.log("entering before all")
  await utils.waitForCDP(9097);
  const browser = await chromium.connectOverCDP('http://localhost:9097');
  sharedContext = browser.contexts()[0] ?? await browser.newContext();
});

Before(async function (this: CustomWorld) {
  this.context = sharedContext;
});

AfterAll(async function () {
  await sharedContext.close();
});
