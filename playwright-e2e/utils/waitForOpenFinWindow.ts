import { BrowserContext, Page } from "playwright";
import { CustomWorld } from "../e2e/hooks/world";

export async function waitForOpenFinWindow(
  context: BrowserContext,
  triggerClick: () => Promise<void>,
  urlFragment: string,
  timeoutMs = 5000
): Promise<Page> {
  await triggerClick();
  var i =0;
  while (i<=10) {
    const pages = context.pages();
    console.log('available pages:', pages.map(p => p.url()));
    for (const p of pages) {
      if (p.url().includes(urlFragment)) {
        await p.waitForLoadState();
        return p;
      }
    }
    await new Promise(res => setTimeout(res, 1000));i+=1;
  }

  throw new Error(`OpenFin window with URL containing "${urlFragment}" not found`);
}
