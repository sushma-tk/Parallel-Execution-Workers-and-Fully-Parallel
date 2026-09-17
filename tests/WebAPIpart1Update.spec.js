const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require("../utils/APiUtils.js");
const loginPayLoad = {userEmail:"sushma.tacholi@gmail.com",userPassword:"Sushma@1234"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


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

});

//Verify if order created is showing in history page
// Precondition - create order -






// // modified webAPIpart1.spec.js file to maintain clean and simpler code.
// // added APIUtils.js file and implemented getToken() function to get the token from API and use it in webAPIpart1.spec.js file.


// const {test, expect, request} = require('@playwright/test');

// const loginPayload = {userEmail: "sushma.tacholi@gmail.com", userPassword: "Sushma@1234"};
// const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
// let token;
// let orderId;

// test.beforeAll(async () => {
//     const apiContext = await request.newContext();   // newContext() should be created in actual test. so dont write in utils file.
//                                                      // but we have to send this context to utils files. create constructor in utils file and pass this context to utils file. then use this context in utils file.

//     // add to cart 
//     const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
//         data: orderPayload,
//         headers: {
//             'Authorization': token,
//             'Content-Type': 'application/json'
//         }
//     });
//     const orderResponseJson = await orderResponse.json();
//     console.log("*****")
//     console.log(orderResponseJson);
//     orderId = orderResponseJson.orders[0];
//     console.log(orderId);

// });



// // test.beforeEach(async () => {
// // //
// // });



// test('test2', async ({browser})=>
// {
//     const context = await browser.newContext();
//     const page= await context.newPage();

    
//     page.addInitScript(value => {
//         window.localStorage.setItem('token', value);
//     }, token);
    
//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // now it will take you directly inside page

//     await page.waitForLoadState('domcontentloaded');

//     await page.locator("button[routerlink*='myorders']").click();
//     await page.locator("tbody").waitFor();
//     const rows = await page.locator("tbody tr");
//     for(let i=0; i< await rows.count(); ++i)
//     {
//        const rowOrderId = await rows.nth(i).locator("th").textContent();
//        if (orderId.includes(rowOrderId)) 
//         {
//          await rows.nth(i).locator("button").first().click();
//          break;
//         }
//     }


//     const orderIdDetails = await page.locator(".col-text").textContent();
//     await page.pause();
//     expect(orderId.includes(orderIdDetails)).toBeTruthy();

// }
// );




