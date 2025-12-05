import {defineConfig} from '@playwright/test'

export default defineConfig({

    testDir:'./e2e',
    timeout: 120000,
    retries:0,
    use:{
        headless:false
    }
,
webServer:{
    command:'npm start --prefix ../openfinproject',
    port:4200,
    timeout:120000,
    reuseExistingServer:true
},
globalSetup:'./global-setup.ts'
});