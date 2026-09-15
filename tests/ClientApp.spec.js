const {test, expect} = require('@playwright/test');


test('test2', async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();

    const email = "sushma.tacholi@gmail.com"
    const userName = page.locator('#userEmail');
    const password = page.locator("#userPassword");
    const logIn = page.locator("#login");
    const titles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"
    const cartBtn = page.locator("[routerlink*='cart']");
    const checkoutBtn = page.locator("button:has-text('Checkout')");
    const countryDrpDwn = page.locator(".ta-results");
    const placeorderBtn = page.locator('.action__submit');

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //console.log(await page.title());
    await userName.fill(email);
    await password.fill("Sushma@1234");
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

    //await expect(page.locator("h3:has-text('Zara Coat 3')")).toBeVisible({timeout:10_00});

    //await page.locator("h3:has-text('Zara Coat 3')").isVisible();

    await checkoutBtn.click();
    //await page.locator('div.payment__type.payment__type--cc.active')

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


    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

}
);




