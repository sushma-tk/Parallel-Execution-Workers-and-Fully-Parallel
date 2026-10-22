const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require("../utils/APiUtils.js");
const loginPayLoad = {userEmail:process.env.USER_EMAIL,userPassword:process.env.USER_PASSWORD};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext({ baseURL: process.env.CLIENT_URL });
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({page})=>
{  
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
    await page.goto("/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for(let i =0; i<await rows.count(); ++i)
    {
    const rowOrderId =await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
        console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);

});










