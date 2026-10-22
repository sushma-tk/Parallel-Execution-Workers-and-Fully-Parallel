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
    const cartBtn = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator("button:has-text('Checkout')");
    const placeorderBtn = page.locator('.action__submit');

    await page.goto("/client/#/auth/login");
    await userName.fill(email);
    await password.fill(pwd);
    await logIn.click();
    await page.waitForLoadState('networkidle');

    // iphone 13 pro
    await page.locator('.card-body').filter({hasText:"iphone 13 pro"}).getByRole('button', {name:'Add To Cart'}).click();

    await cartBtn.click();
    // await page.locator("div li").first().waitFor();
    // await expect(page.locator('h3:has-text("iphone 13 pro")')).toBeVisible();

    // await checkoutBtn.click();

    // await page.locator("input.input.txt").first().fill("4111111111111123");
    // await page.locator("select.input.ddl").nth(0).selectOption("01");
    // await page.locator("select.input.ddl").nth(1).selectOption("26");
    // await page.locator('input.input.txt').nth(1).fill("123");
    // await page.locator('input.input.txt').nth(2).fill("satvik");
    // await page.locator('input.input.txt').nth(3).fill("rahulshettyacademy");
    // await page.locator("button:has-text('Apply Coupon')").click();
    // await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");


    // await page.locator("input[placeholder='Select Country']").pressSequentially("Ind", { delay: 100 });
    // await page.locator(".ta-results").waitFor();
    // await page.getByText('India', { exact: true }).click();

    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    // await placeorderBtn.click();

    // await expect(page.locator('h1.hero-primary')).toHaveText(" Thankyou for the order. ");
    // //const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    // //console.log(orderId);

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
}
);