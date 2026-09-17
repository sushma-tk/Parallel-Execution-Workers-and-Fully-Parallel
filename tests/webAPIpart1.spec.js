const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "sushma.tacholi@gmail.com", userPassword: "Sushma@1234"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});
    expect(loginresponse.ok()).toBeTruthy();
    const responseJson = await loginresponse.json();
    token = responseJson.token;
    console.log(token);

    // add to cart 
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    const orderResponseJson = await orderResponse.json();
    console.log("*****")
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    console.log(orderId);

});



// test.beforeEach(async () => {
// //
// });



test('test', async ({browser})=>
{
    const context = await browser.newContext();
    const page= await context.newPage();

    const titles = page.locator(".card-body b");

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // now it will take you directly inside page

    await page.waitForLoadState('domcontentloaded');

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
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

}
);




