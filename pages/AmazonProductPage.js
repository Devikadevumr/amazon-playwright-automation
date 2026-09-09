class AmazonProductPage {

    constructor(page) {
        this.page = page;

        // Product title
        this.productTitle = page.locator('span#productTitle');

        // Add to Cart button
        this.addToCartButton = page
            .locator('#add-to-cart-button')
            .last();

        // Submit button for some products
        this.submitButton = page
            .locator('#attach-cart-info-content')
            .getByRole('button', { name: 'Submit' });

        // Go to Cart link
        this.goToCartLink = page.getByRole(
            'link',
            { name: 'Go to Cart' }
        );
    }


    // Add product to cart
    async addToCart() {

        await this.addToCartButton.click();
    }


    // Handle popup if Submit button appears
    async handleCartPopup() {

        const submitVisible =
            await this.submitButton
                .isVisible()
                .catch(() => false);

        if (submitVisible) {

            await this.submitButton.click();
        }
    }


    // Verify product was added to cart
    async verifyAddedToCart() {

        await this.page.waitForTimeout(2000);

        const cartLinkVisible =
            await this.goToCartLink
                .first()
                .isVisible()
                .catch(() => false);

        return cartLinkVisible;
    }


    // Go to Cart
    async goToCart() {

        const cartLinkVisible =
            await this.goToCartLink
                .first()
                .isVisible()
                .catch(() => false);


        if (cartLinkVisible) {

            const cartUrl =
                await this.goToCartLink
                    .first()
                    .getAttribute('href');

            await this.page.goto(
                `https://www.amazon.in${cartUrl}`
            );

        } else {

            // Open cart directly if Go to Cart link
            // is not displayed
            await this.page.goto(
                'https://www.amazon.in/gp/cart/view.html'
            );
        }
    }
}


module.exports = { AmazonProductPage };