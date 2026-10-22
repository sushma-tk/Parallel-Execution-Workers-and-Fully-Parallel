const {test, expect, request} = require('@playwright/test');

const {customtest} = require('../utils/fixtures.js');  // this will make the customtest available to this file.

// authenticatedpage is the name of the fixture which we have created in fixtures.js file.
// when we have custom fixture, first it will be executed and then the test will be executed.
customtest('Fixtures demo', async ({authenticatedpage, createorder, testDataForOrder})=> {
    console.log(`START | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
    await authenticatedpage.goto("/client/#/dashboard");
    await authenticatedpage.locator("button[routerlink*='myorders']").click();
    await authenticatedpage.locator("tbody").waitFor();
    await expect(authenticatedpage.getByText(createorder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);

    console.log(`END   | ${test.info().title} | worker ${test.info().workerIndex} | ${new Date().toLocaleTimeString()}`);
}
);