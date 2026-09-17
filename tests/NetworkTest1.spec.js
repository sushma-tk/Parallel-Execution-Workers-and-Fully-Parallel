const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require("./utils/APiUtils.js");
const loginPayLoad = {userEmail:"sushma.tacholi@gmail.com",userPassword:"Sushma@1234"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data: [], message: "No Orders"};

// in this scenario we create an order using api
// but we dont want that in this case. Any way we will intercept the orders page response in test

let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {

        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");

// before we click on orders, we have to mock how we want to intercept the orders page response.
// in this case we want to have no orders in the order page.
// api response -> playwirght fake response -> browser -> render data on front end
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a97656e21054ba46504e420", 
    async route => { 
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);
        route.fulfill({
            response,
            body,
        })
    }
)


 await page.locator("button[routerlink*='myorders']").click();
 await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a97656e21054ba46504e420");
 console.log(await page.locator(".mt-4").textContent());



});







