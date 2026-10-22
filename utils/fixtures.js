const base = require("@playwright/test");

const {APiUtils} = require("../utils/APiUtils");  // we have to import this file because we are using this class in this file.
const {request} = require('@playwright/test');
const loginPayLoad = {userEmail:process.env.USER_EMAIL,userPassword:process.env.USER_PASSWORD};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend({                          // exports. will make this available all over.
    authenticatedpage : async ({browser}, use)=> {
        const context = await browser.newContext();
        const page= await context.newPage();

        await page.goto("/client/#/auth/login");
        await page.locator('#userEmail').fill(process.env.USER_EMAIL);
        await page.locator('#userPassword').fill(process.env.USER_PASSWORD);
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle');
        await use(page);  // whatever wrappedd in use() will be send to authenticatedpage. 
                        // everytime we call authenticatedpage, it will give us page which is already logged in.
        await context.close();  // this will close the browser after the test is completed. 

    },
    createorder : async ({}, use)=> {
        // const apiContext = await request.newContext();
        const apiContext = await request.newContext({ baseURL: process.env.CLIENT_URL });
        const apiUtils = new APiUtils(apiContext,loginPayLoad);
        const response =  await apiUtils.createOrder(orderPayLoad);
        await use(response);  // whatever wrappedd in use() will be send to createorder.
        await apiContext.dispose();  // this will close the browser after the test is completed.
    },
    testDataForOrder : {
        productName : "ZARA COAT 3"      // data driven. we can write multiple objects in fixtures and use it in test file also
    }
    
})