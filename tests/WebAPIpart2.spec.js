
const {test, expect} = require('@playwright/test');

let webContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext({ baseURL: process.env.CLIENT_URL });
    const page= await context.newPage();

    await page.goto("/client/#/auth/login");
    await page.locator('#userEmail').fill(process.env.USER_EMAIL);
    await page.locator('#userPassword').fill(process.env.USER_PASSWORD);
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    // get the storage state and save it to a file
    await context.storageState({path: "state.json"});

    // browser with new storage state context.
    webContext = await browser.newContext({storageState: "state.json", baseURL: process.env.CLIENT_URL});  // new browser will have all the details it need to behave like logged in user.
    

}
);


test('test', async ()=>
{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const email = process.env.USER_EMAIL;
    // removed {browser}. as we just dynamically created new browser context in beforeAll().
    const page = await webContext.newPage();

    await page.goto("/client/#/auth/login"); // it will directly logged in here.
    await page.waitForLoadState('networkidle');

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"
    const cartBtn = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator("button:has-text('Checkout')");
    const countryDrpDwn = page.locator(".ta-results");
    const placeorderBtn = page.locator('.action__submit');
    

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

    await page.locator("input.input.txt").first().fill("4111111111111123");
    await page.locator("select.input.ddl").nth(0).selectOption("01");
    await page.locator("select.input.ddl").nth(1).selectOption("26");
    await page.locator('input.input.txt').nth(1).fill("123");
    await page.locator('input.input.txt').nth(2).fill("satvik");
    await page.locator('input.input.txt').nth(3).fill("rahulshettyacademy");
    await page.locator("button:has-text('Apply Coupon')").click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");


    await page.locator("input[placeholder='Select Country']").pressSequentially("Ind", { delay: 100 });
    await countryDrpDwn.waitFor();
   const optionscount = await countryDrpDwn.locator("button").count();
   for(let i=0; i< optionscount; ++i)
   {
    const text = await countryDrpDwn.locator("button").nth(i).textContent();
    if(text === " India")
        {
            await countryDrpDwn.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await placeorderBtn.click();

    await expect(page.locator('h1.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);


    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i=0; i< await rows.count(); ++i)
    {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(rowOrderId)) 
        {
         await rows.nth(i).locator("button").first().click();
         break;
        }
    }


    // const orderIdDetails = await page.locator(".col-text").textContent();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();
    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
}
);



test('test2', async ()=>{
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    const page = await webContext.newPage();
    await page.goto("/client/#/auth/login"); 
    await page.waitForLoadState('networkidle');
    // get count of all products present in the page.
    const products = page.locator(".card-body");
    const count = await products.count();
    console.log(count);

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
}
);