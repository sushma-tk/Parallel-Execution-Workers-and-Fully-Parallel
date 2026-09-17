const {test, expect} = require('@playwright/test');

test('Test1', async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();

    // block css
    page.route('**/*.css', route => route.abort());

    // block images
    // page.route('**/*.{png,jpg,jpeg}', route => route.abort());

     const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // login  
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});




// track request calls and response calls and print the url of the request/responses
test('Test2', async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();

     const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    // track request calls and print the url of the request
    page.on('request', request => console.log(request.url()));

    // track response calls and print the url of the response
    page.on('response', response => console.log(response.url(), response.status()));   // status will be only for responses

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    // login  
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});
