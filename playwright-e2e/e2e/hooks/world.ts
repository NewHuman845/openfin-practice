
import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext } from 'playwright';

export class CustomWorld {
  context!: BrowserContext;

  constructor(options: IWorldOptions) {
    // you can access options.parameters here if you want
  }
}

setWorldConstructor(CustomWorld);