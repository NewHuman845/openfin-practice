import {defineConfig} from '@playwright/test'


export default defineConfig({

    testDir:'./e2e',
     reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
    use:{
        headless:false
    }
})