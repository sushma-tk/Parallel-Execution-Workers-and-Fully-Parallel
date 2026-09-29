const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li");
        this.checkoutBtn = page.locator("button:has-text('Checkout')");
    }

    async verifyProductInCart(productName) {
        await this.cartProducts.first().waitFor();
        return await this.page.locator(`h3:has-text('${productName}')`).isVisible();
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}

module.exports = { CartPage };