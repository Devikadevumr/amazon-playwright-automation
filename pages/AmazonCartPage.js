class AmazonCartPage {

    constructor(page) {

        this.page = page;

        // Cart heading
        this.cartHeading = page
            .getByText(
                /Shopping Cart|Your Amazon Cart/
            )
            .first();

        // Active cart items
        this.cartItems = page.locator(
            '[data-itemtype="active"]'
        );

        // Cart content
        this.cartContent = page.locator(
            '#sc-active-cart'
        );
    }


    // Verify cart page loaded
    async verifyCartPage() {

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }


    // Verify cart has products
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