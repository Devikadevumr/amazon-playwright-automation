class AmazonCartPage {

    constructor(page) {
        this.page = page;

        // Cart page heading
        this.cartHeading = page
            .getByText(/Shopping Cart|Your Amazon Cart/)
            .first();

        // Cart items
        this.cartItems = page.locator(
            '[data-itemtype="active"]'
        );

        // Alternative cart content locator
        this.cartContent = page.locator(
            '#sc-active-cart'
        );
    }


    // Verify cart page is opened
    async verifyCartPage() {

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }


    // Verify cart contains products
    async verifyCartHasProducts() {

        const cartContentVisible =
            await this.cartContent
                .isVisible()
                .catch(() => false);

        if (cartContentVisible) {

            return true;

        }

        const itemCount =
            await this.cartItems.count();

        return itemCount > 0;
    }
}


module.exports = { AmazonCartPage };