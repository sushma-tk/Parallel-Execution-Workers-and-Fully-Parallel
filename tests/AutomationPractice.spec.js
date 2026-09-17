const {test, expect} = require('@playwright/test');

// // page forward and backward 
// test("page forward and backward", async ({page})=>
// {
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//     await page.goto("https://www.google.com/");
//     await page.goBack();
//     await page.goForward();
// });

// // element hidden and visible check
// test("Element hidden / display test", async ({page})=>
// {
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//     await expect(page.locator('#displayed-text')).toBeVisible();
//     await page.locator("#hide-textbox").click();
//     await expect(page.locator('#displayed-text')).toBeHidden();
// });

// // alerts 
// // page.on("dialog", dialog => dialog.dismiss());
// // page.on("dialog", dialog => dialog.accept());
// test("Alerts test", async ({page})=>
// {
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//     await page.pause();
//     // we first register the listener before the click that triggers the alert
//     page.on("dialog", dialog => dialog.accept());

//     // now when we click on button that triggers the alert, above page.on() will handle the alert 
//     await page.locator('#confirmbtn').click();

// });


// // hover
// test("Hover test", async ({page})=>{
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//      await page.pause();
//     await page.locator("#mousehover").hover();
//     await page.locator("a:has-text('Top')").click();
   
// });



// frame 
// test("Frame test", async ({browser})=>{
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//     const framePage = await page.frameLocator("#courses-iframe");


// });

// screenshot capture
test("Screenshot & visual comparison", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    // partical screenshot capture
    await page.locator("#displayed-text").screenshot({path:"partical_screenshot.png"});
    await page.locator("#hide-textbox").click();

    // screenshot capture
    await page.screenshot({path:"screenshot.png", fullPage:true});
    await expect(page.locator('#displayed-text')).toBeHidden();
    
});


// visual comparison
test.only("Visual comparison", async ({page})=>{
    await page.goto("https://www.nbcnews.com/");
    expect(await page.screenshot()).toMatchSnapshot("nbcnews.png");
    // when you run it for the first time, it will create a file called nbcnews.png in the snapshots folder.
    // when you run it for the second time, it will compare the current screenshot with the previous one and if there is any difference, it will fail the test.
});
