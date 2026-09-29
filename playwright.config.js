// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  retries : 3,
  // workers : 10,
  timeout : 100 * 1000,
  expect : {timeout : 5000,},
  reporter: 'html',
  
  use: {
    browserName : 'chromium',
    headless : true,
    //navigationTimeout: 60000,
    screenshot : 'on',
    // trace : 'on',
    trace : 'retain-on-failure',
    // video : 'retain-on-failure'
  },

});

