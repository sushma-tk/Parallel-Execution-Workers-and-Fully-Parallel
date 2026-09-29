class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async waitForPageLoad() {
        await this.ordersTable.waitFor();
    }

    async searchOrderAndSelect(orderId) {
        const count = await this.rows.count();
        for (let i = 0; i < count; ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderIdDetails() {
        return await this.orderIdDetails.textContent();
    }
}

module.exports = { OrdersHistoryPage };