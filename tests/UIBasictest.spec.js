const {test, expect} = require('@playwright/test');

test('Browser context test', async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();

     const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await password.fill("Password12");
    await signIn.click();

    console.log(await page.locator("[style *= 'block']").textContent());
    await expect(page.locator("[style *= 'block']")).toContainText("Incorrect")

    // login again 
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    // only 1st title
    // console.log(await cardTitles.nth(0).textContent());
    // all titles
    await page.waitForLoadState('networkidle');
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});


test('page test', async ({page})=>
{
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});


test('UI controls', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const userBtn = page.locator("span.radiotextsty");
    const dropDown = page.locator("select.form-control");
    const checkbox = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");

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

    
});


test("Child window test", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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

});