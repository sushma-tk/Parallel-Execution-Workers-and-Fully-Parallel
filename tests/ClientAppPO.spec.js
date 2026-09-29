const {test, expect} = require('@playwright/test');

// custom test for fixture test data example
const {customtest} = require('../utils/test-base.js')


const {POManager} = require('../pageobjects/POManager.js')
// json -> string -> js object
// if any other encoding, json to object might have some issues.
const dataset = JSON.parse(JSON.stringify(require("../utils/ClientAppPOTestData.json")));

test('test', async ({page})=>
{
    const poManager = new POManager(page);

   // login page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.username, dataset.password);

    // dashboard page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.navigateToCart();
    

    // cart page
    const cartPage = poManager.getCartPage();
    expect(await cartPage.verifyProductInCart(dataset.productName)).toBeTruthy();
    await cartPage.checkout();


    // checkout page
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.waitForPageLoad();
    await checkoutPage.fillPaymentDetails("4111111111111123", "01", "26", "123", "satvik");
    await checkoutPage.applyCoupon("rahulshettyacademy");
    expect(await checkoutPage.getCouponMessage()).toContain("Coupon Applied");
    await checkoutPage.selectCountry("India");
    expect(await checkoutPage.getUserEmail()).toContain(dataset.username);
    await checkoutPage.placeOrder();

        // order confirmation page
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.waitForPageLoad();
    expect(await orderConfirmationPage.getConfirmationText()).toContain("Thankyou for the order");
    const orderId = await orderConfirmationPage.getOrderId();
    console.log(orderId);
    await orderConfirmationPage.navigateToOrdersHistory();

    // orders history page
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.waitForPageLoad();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    const orderIdDetails = await ordersHistoryPage.getOrderIdDetails();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
}
);






customtest('test2', async ({page, testDataForOrder})=>
{
    const poManager = new POManager(page);

   // login page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    // dashboard page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    

    // cart page
    const cartPage = poManager.getCartPage();
    expect(await cartPage.verifyProductInCart(testDataForOrder.productName)).toBeTruthy();
    await cartPage.checkout();

});

