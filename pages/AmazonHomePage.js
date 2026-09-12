class AmazonHomePage {

    constructor(page) {

        this.page = page;

        // Search box
        this.searchBox = page.getByRole(
            'searchbox',
            {
                name: 'Search Amazon.in'
            }
        );

        // Search results container
        this.searchResults = page.locator(
            '.s-main-slot'
        );

        // Product links
        this.productLinks = page.locator(
            'a.a-link-normal.s-no-outline'
        );
    }


    // Open Amazon
    async goto() {

        await this.page.goto(
            'https://www.amazon.in/',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        await this.searchBox.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }


    // Search product
    async searchProduct(product) {

        // Wait for search box
        await this.searchBox.waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Clear search box
        await this.searchBox.fill('');

        // Enter product
        await this.searchBox.fill(product);

        // Press Enter
        await this.searchBox.press('Enter');

        // Wait for search page navigation
        await this.page.waitForLoadState(
            'domcontentloaded',
            {
                timeout: 60000
            }
        ).catch(() => {});

        // Wait for URL to contain search page
        await this.page.waitForURL(
            /amazon\.in\/s/,
            {
                timeout: 60000
            }
        ).catch(() => {});

        // Wait for Amazon dynamic content
        await this.page.waitForTimeout(3000);

        // Check whether page is still open
        if (this.page.isClosed()) {

            throw new Error(
                `Page was closed while searching for ${product}`
            );
        }

        // Check search results visibility
        const resultsVisible =
            await this.searchResults
                .isVisible()
                .catch(() => false);

        // Wait if search results are not visible yet
        if (!resultsVisible) {

            await this.searchResults.waitFor({
                state: 'visible',
                timeout: 30000
            });
        }

        // Wait for product links
        await this.productLinks
            .first()
            .waitFor({
                state: 'visible',
                timeout: 30000
            });
    }


    // Click first usable product
    async clickFirstProduct() {

        const productCount =
            await this.productLinks.count();

        for (
            let i = 0;
            i < productCount;
            i++
        ) {

            const product =
                this.productLinks.nth(i);

            // Check if visible
            const visible =
                await product
                    .isVisible()
                    .catch(() => false);

            if (!visible) {
                continue;
            }

            // Get product URL
            const productUrl =
                await product.getAttribute('href');

            // Skip invalid links
            if (
                !productUrl ||
                productUrl.includes('/sspa/click')
            ) {
                continue;
            }

            // Open product directly
            await this.page.goto(
                new URL(
                    productUrl,
                    'https://www.amazon.in'
                ).href,
                {
                    waitUntil: 'domcontentloaded',
                    timeout: 60000
                }
            );

            return this.page;
        }

        // If no product found
        throw new Error(
            'No usable product was found'
        );
    }
}


module.exports = { AmazonHomePage };