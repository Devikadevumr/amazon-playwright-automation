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

        // Search results
        this.searchResults = page.locator(
            '.s-main-slot'
        );

        // First product
        this.firstProduct = page.locator(
            '.a-link-normal.s-no-outline'
        ).first();
    }


    // Open Amazon
    async goto() {

        await this.page.goto(
            'https://www.amazon.in/',
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }


    // Search product
    async searchProduct(product) {

        await this.searchBox.waitFor({
            state: 'visible'
        });

        await this.searchBox.fill(product);

        await this.searchBox.press('Enter');

        await this.searchResults.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await this.firstProduct.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }


    // Click first product
    async clickFirstProduct() {

        const context = this.page.context();

        const pagesBefore = context.pages().length;

        await this.firstProduct.click();

        // Wait for page change
        await this.page.waitForTimeout(2000);

        const pagesAfter = context.pages();

        // New tab opened
        if (pagesAfter.length > pagesBefore) {

            const newPage =
                pagesAfter[pagesAfter.length - 1];

            await newPage.waitForLoadState(
                'domcontentloaded'
            );

            return newPage;
        }

        // Same tab
        return this.page;
    }
}


module.exports = { AmazonHomePage };