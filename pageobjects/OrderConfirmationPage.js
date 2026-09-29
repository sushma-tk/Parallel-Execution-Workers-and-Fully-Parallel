class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmationText = page.locator('h1.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersHistoryBtn = page.locator("button[routerlink*='myorders']");
    }

    async waitForPageLoad() {
        await this.orderConfirmationText.waitFor();
    }

    async getConfirmationText() {
        return await this.orderConfirmationText.textContent();
    }

    async getOrderId() {
        return await this.orderId.textContent();
    }

    async navigateToOrdersHistory() {
        await this.ordersHistoryBtn.click();
    }
}

module.exports = { OrderConfirmationPage };