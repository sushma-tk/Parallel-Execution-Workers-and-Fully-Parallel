const {test, expect} = require('@playwright/test');

// screenshot capture
test("Screenshot & visual comparison", async ({page})=>{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    // partical screenshot capture
    await page.locator("#displayed-text").screenshot({path:"partical_screenshot.png"});
    await page.locator("#hide-textbox").click();

    // screenshot capture
    await page.screenshot({path:"screenshot.png", fullPage:true});
    await expect(page.locator('#displayed-text')).toBeHidden();
    
    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});


// visual comparison
test("Visual comparison", async ({page})=>{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await page.goto("https://www.nbcnews.com/");
    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});
