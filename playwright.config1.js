// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { permission } from 'node:process';

 

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = (
  {
    testDir: './tests',
    timeout: 30 * 1000,
    workers:5,
    retries:1,
    expect: {
                timeout: 5000,
            },
  
  reporter: 'html',
  
  projects:[
    {
      name: 'chrome',
       use:  
       {
            
            browserName: 'chromium',
            headless: false, 
            screenshot: 'only-on-failure',
            trace: 'retain-on-failure', 
            video: 'retain-on-failure',
            ignoreHttpsErrors:true,
            permissions: ['geolocation','notifications','camera','microphone'],
          //  ...devices['Galaxy Tab S9 landscape'],
           // viewport: {width:1520,height:1020},
            actionTimeout: 10*1000,
            navigationTimeout: 30*1000,
        } 
    },
    {
      name: 'firefox',
       use:  
       {

            browserName: 'firefox',
            headless: true, 
            screenshot: 'on', //only-on-failure
            trace: 'retain-on-failure', 

            actionTimeout: 10*1000,
            navigationTimeout: 30*1000,
        } 
    },
    {
      name: 'webkit',
       use:  
       {

            browserName: 'webkit',
            headless: true, 
            screenshot: 'on', //only-on-failure
            trace: 'retain-on-failure', 

            actionTimeout: 10*1000,
            navigationTimeout: 30*1000,
        } 
    }
  ] 




});
module.exports = config
