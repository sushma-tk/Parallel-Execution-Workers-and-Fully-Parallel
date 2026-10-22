// @ts-check
import { defineConfig } from '@playwright/test';
require('dotenv').config();

export default defineConfig({
  testDir: './tests',
  retries : 0,
  workers : 4,
  fullyParallel : false,
  timeout : 100 * 1000,
  expect : {timeout : 5000,},
  //reporter: 'html',
  reporter: [['list'], ['html']],
  
  use: {
    browserName : 'chromium',
    headless : true,
    //navigationTimeout: 60000,
    screenshot : 'on',
    // trace : 'on',
    trace : 'retain-on-failure',
    // video : 'retain-on-failure'
    baseURL: process.env.CLIENT_URL,
  },

});

