// syntax for fixtures
// const base = require("@playwright/test");

// exports.customtest = base.test.extend({    
//     fixture1 : async ({browser}, use)=> {
//         //
//     },
//     fixture2 : async ({browser}, use)=> {
//         //
//     }
// })               


// exports.customtest = base.test.extend({    
//     fixture1 : async ({browser}, use)=> {
//         //    (setup code)
//         await use(page);  
//    },   //    (teardown code)  -> this is executed after the test is completed. so we can write teardown code here.
//     }
// })  



const base = require("@playwright/test");

const {APiUtils} = require("../utils/APiUtils");  // we have to import this file because we are using this class in this file.
const {request} = require('@playwright/test');
const loginPayLoad = {userEmail:"sushma.tacholi@gmail.com",userPassword:"Sushma@1234"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend({                          // exports. will make this available all over.
    authenticatedpage : async ({browser}, use)=> {
        const context = await browser.newContext();
        const page= await context.newPage();

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator('#userEmail').fill("sushma.tacholi@gmail.com");
        await page.locator('#userPassword').fill("Sushma@1234");
        await page.locator('#login').click();
        await page.waitForLoadState('networkidle');
        await use(page);  // whatever wrappedd in use() will be send to authenticatedpage. 
                        // everytime we call authenticatedpage, it will give us page which is already logged in.
        await context.close();  // this will close the browser after the test is completed. 

    },
    createorder : async ({}, use)=> {
        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext,loginPayLoad);
        const response =  await apiUtils.createOrder(orderPayLoad);
        await use(response);  // whatever wrappedd in use() will be send to createorder.
        await apiContext.dispose();  // this will close the browser after the test is completed.
    },
    testDataForOrder : {
        productName : "ZARA COAT 3"      // data driven. we can write multiple objects in fixtures and use it in test file also
    }
    
})

