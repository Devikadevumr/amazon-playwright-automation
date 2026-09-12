class AmazonProductPage {

    constructor(page) {

        this.page = page;

        // Visible product title only
        this.productTitle = page.locator(
            'span#productTitle'
        );

        // Add to Cart button
        this.addToCartButton = page.locator(
            '#add-to-cart-button'
        ).last();

        // Submit button that sometimes appears
        this.submitButton = page
            .locator('#attach-cart-info-content')
            .getByRole(
                'button',
                {
                    name: 'Submit'
                }
            );

        // Go to Cart link
        this.goToCartLink = page.getByRole(
            'link',
            {
                name: 'Go to Cart'
            }
        );
    }


    // Add product to cart
    async addToCart() {

        await this.addToCartButton.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.addToCartButton.click();
    }


    // Handle optional popup
    async handleCartPopup() {

        const submitVisible =
            await this.submitButton
                .isVisible()
                .catch(() => false);

        if (submitVisible) {

            await this.submitButton.click();

        }
    }


    // Verify product was added
    async verifyAddedToCart() {

        // Give Amazon time to update cart
        await this.page.waitForTimeout(2000);

        return await this.goToCartLink
            .first()
            .isVisible()
            .catch(() => false);
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

            if (cartUrl) {

                await this.page.goto(
                    new URL(
                        cartUrl,
                        'https://www.amazon.in'
                    ).href,
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    }
                );

                return;
            }
        }

        // Fallback cart URL
        await this.page.goto(
            'https://www.amazon.in/gp/cart/view.html',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
    }

}


module.exports = { AmazonProductPage };