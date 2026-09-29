const {LoginPage} = require('../pageobjects/LoginPage.js')
const {DashboardPage} = require('../pageobjects/DashboardPage.js');
const { CartPage } = require('../pageobjects/CartPage.js');
const { CheckoutPage } = require('../pageobjects/CheckoutPage.js');
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage.js');
const { OrdersHistoryPage } = require('../pageobjects/OrdersHistoryPage.js');


class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);

    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderConfirmationPage()
    {
        return this.orderConfirmationPage;
    }

    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }



}

module.exports = {POManager};