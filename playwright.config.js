// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = (
  {
    testDir: './tests',
    timeout: 30 * 1000,
    retries:1,
    expect: {
                timeout: 5000,
            },
  
  reporter: 'html',
  
  use: 
  {

    browserName: 'chromium',
    headless: false, 
    screenshot: 'on',
    trace: 'retain-on-failure', 
    
    actionTimeout: 10*1000,
    navigationTimeout: 30*1000,
  }, 




});
module.exports = config
