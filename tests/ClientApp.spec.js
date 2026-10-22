const {test, expect} = require('@playwright/test');


test('test2', async ({browser})=>
{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const context = await browser.newContext();
    const page= await context.newPage();

    const email = process.env.USER_EMAIL;
    const pwd = process.env.USER_PASSWORD;
    const userName = page.locator('#userEmail');
    const password = page.locator("#userPassword");
    const logIn = page.locator("#login");
    const titles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"
    const cartBtn = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator("button:has-text('Checkout')");
    //const countryDrpDwn = page.locator(".ta-results");
    //const placeorderBtn = page.locator('.action__submit');

    await page.goto("/client/#/auth/login");
    //console.log(await page.title());
    await userName.fill(email);
    await password.fill(pwd);
    await logIn.click();

    console.log(await titles.nth(0).textContent());
    //await page.waitForLoadState('networkidle');
    console.log(await titles.allTextContents());

    //Zara Coat 4
    const count = await products.count();
    for(let i=0; i< count; ++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cartBtn.click();
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('Zara Coat 3')")).toBeVisible();
    await checkoutBtn.click();

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
}
);