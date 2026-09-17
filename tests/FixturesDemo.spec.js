const {test, expect, request} = require('@playwright/test');

const {customtest} = require('./utils/fixtures.js');  // this will make the customtest available to this file.

// authenticatedpage is the name of the fixture which we have created in fixtures.js file.
// when we have custom fixture, first it will be executed and then the test will be executed.
customtest('Fixtures demo', async ({authenticatedpage, createorder, testDataForOrder})=> {
    authenticatedpage.goto("https://rahulshettyacademy.com/client/#/dashboard");
    await authenticatedpage.locator("button[routerlink*='myorders']").click();
    await authenticatedpage.locator("tbody").waitFor();
    await expect(authenticatedpage.getByText(createorder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);

}
);