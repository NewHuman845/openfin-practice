import {defineConfig} from '@playwright/test'


export default defineConfig({

    testDir:'./e2e',
    retries:0,
     reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    use:{
        headless:false
    }
})