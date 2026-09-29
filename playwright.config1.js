// // @ts-check
// import { defineConfig, devices } from '@playwright/test';


// export default defineConfig({
//   testDir: './tests',
//   timeout : 100 * 1000,
//   expect : {timeout : 5000,},
//   reporter: 'html',
  
//   projects : [
//     {
//       name : "Chrome test",
//       use: {
//         browserName : 'chromium',
//         headless : true,
//         screenshot : 'on',
//         trace : 'retain-on-failure',
//         ignoreHTTPSErrors: true,
//         //viewport: { width: 1920, height: 1080 }
//       },
//     },
//     {
//       name : "Safari test",
//       use: {
//         browserName : 'webkit',
//         headless : true,
//         screenshot : 'on',
//         trace : 'retain-on-failure',
//         ...devices['iPhone 13']
//       },
//     }
//   ]

// });

