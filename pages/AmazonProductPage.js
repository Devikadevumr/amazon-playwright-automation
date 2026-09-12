class AmazonProductPage {

    constructor(page) {

        this.page = page;

        // Product title
        // Use span because Amazon also has
        // a hidden input with the same ID
        this.productTitle = page.locator(
            'span#productTitle'
        );

        // Add to Cart button
        this.addToCartButton = page
            .locator('#add-to-cart-button')
            .last();

        // Submit button for some products
        this.submitButton = page
            .locator('#attach-cart-info-content')
            .getByRole(
                'button',
                { name: 'Submit' }
            );

        // Go to Cart link
        this.goToCartLink = page.getByRole(
            'link',
            { name: 'Go to Cart' }
        );

        // Cart count
        this.cartCount = page.locator(
            '#nav-cart-count'
        );
    }


    // Add product to cart
    async addToCart() {

        await this.addToCartButton.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.addToCartButton.click();

        await this.page.waitForTimeout(1000);
    }


    // Handle popup if Submit button appears
    async handleCartPopup() {

        const submitVisible =
            await this.submitButton
                .isVisible()
                .catch(() => false);

        if (submitVisible) {

            await this.submitButton.click();

            await this.page.waitForTimeout(1000);
        }
    }


    // Verify product was added to cart
    async verifyAddedToCart() {

        const cartLinkVisible =
            await this.goToCartLink
                .first()
                .isVisible()
                .catch(() => false);

        const cartCountVisible =
            await this.cartCount
                .isVisible()
                .catch(() => false);

        return (
            cartLinkVisible ||
            cartCountVisible
        );
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
                    `https://www.amazon.in${cartUrl}`,
                    {
                        waitUntil: 'domcontentloaded',
                        timeout: 60000
                    }
                );

                return;
            }
        }


        // Open cart directly
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