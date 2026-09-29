class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.creditCardNo = page.locator("input.input.txt").first();
        this.expiryMonth = page.locator("select.input.ddl").nth(0);
        this.expiryYear = page.locator("select.input.ddl").nth(1);
        this.cvvCode = page.locator('input.input.txt').nth(1);
        this.nameOnCard = page.locator('input.input.txt').nth(2);
        this.couponCode = page.locator('input.input.txt').nth(3);
        this.applyCouponBtn = page.locator("button:has-text('Apply Coupon')");
        this.couponMsg = page.locator(".mt-1.ng-star-inserted");
        this.countryInput = page.locator("input[placeholder='Select Country']");
        this.countryDrpDwn = page.locator(".ta-results");
        this.userEmail = page.locator(".user__name [type='text']").first();
        this.placeorderBtn = page.locator('.action__submit');
    }

    async waitForPageLoad() {
        await this.creditCardNo.waitFor();
    }

    async fillPaymentDetails(cardNo, month, year, cvv, name) {
        await this.creditCardNo.fill(cardNo);
        await this.expiryMonth.selectOption(month);
        await this.expiryYear.selectOption(year);
        await this.cvvCode.fill(cvv);
        await this.nameOnCard.fill(name);
    }

    async applyCoupon(code) {
        await this.couponCode.fill(code);
        await this.applyCouponBtn.click();
        await this.couponMsg.waitFor();
    }

    async getCouponMessage() {
        return await this.couponMsg.textContent();
    }

    async selectCountry(countryName) {
        await this.countryInput.pressSequentially("Ind", { delay: 100 });
        await this.countryDrpDwn.waitFor();
        const count = await this.countryDrpDwn.locator("button").count();
        for (let i = 0; i < count; ++i) {
            const text = await this.countryDrpDwn.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.countryDrpDwn.locator("button").nth(i).click();
                break;
            }
        }
    }

    async getUserEmail() {
        return await this.userEmail.textContent();
    }

    async placeOrder() {
        await this.placeorderBtn.click();
    }
}

module.exports = { CheckoutPage };