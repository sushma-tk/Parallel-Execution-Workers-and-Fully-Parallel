const {test, expect} = require('@playwright/test');

// test.describe.configure({mode : 'parallel'})
test('Browser context test', async ({browser})=>
{   
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const context = await browser.newContext();
    const page= await context.newPage();

     const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("/loginpagePractise/");
    console.log(await page.title());
    await userName.fill(process.env.PRACTICE_USERNAME);
    await password.fill("Password12");
    await signIn.click();

    console.log(await page.locator("[style *= 'block']").textContent());
    await expect(page.locator("[style *= 'block']")).toContainText("Incorrect")

    // login again 
    await userName.fill(process.env.PRACTICE_USERNAME);
    await password.fill(process.env.PRACTICE_PASSWORD);
    await signIn.click();
    // only 1st title
    // console.log(await cardTitles.nth(0).textContent());
    // all titles
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});


test('page test', async ({page})=>
{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await page.goto(process.env.GOOGLE_URL);
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});


test('UI controls', async ({browser})=>
{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const userBtn = page.locator("span.radiotextsty");
    const dropDown = page.locator("select.form-control");
    const checkbox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("/loginpagePractise/");
     await userName.fill(process.env.PRACTICE_USERNAME);
    await password.fill(process.env.PRACTICE_PASSWORD);

    await userBtn.nth(1).click();
    await page.locator("#okayBtn").click();
    expect(userBtn.nth(1)).toBeChecked();
    // console.log(await userBtn.nth(1).isChecked());

    await dropDown.selectOption("consult")

    await checkbox.click();
    await expect(checkbox.isChecked());

    // we can uncheck and verify if its unchecked like below
    //await checkbox.uncheck();
    //expect(await checkbox.isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");


    //await page.pause();
    //await signIn.click();

    
    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});


test("Child window test", async ({browser})=>
{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/loginpagePractise/");
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");

    const [page2] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ])
    
    console.log(await page2.locator(".red").textContent());
    const text = await page2.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);

    await userName.fill(domain);
    console.log(await userName.inputValue());

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
});