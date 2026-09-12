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

        // Clear previous text
        await this.searchBox.fill('');

        // Search product
        await this.searchBox.fill(product);

        // Press Enter
        await this.searchBox.press('Enter');

        // Wait for navigation
        await this.page.waitForLoadState(
            'domcontentloaded'
        ).catch(() => {});

        // Wait for search result container
        await this.searchResults.waitFor({
            state: 'visible',
            timeout: 60000
        });

        // Wait for first product
        await this.firstProduct.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }


    // Click first product
    async clickFirstProduct() {

        const context = this.page.context();

        const pagesBefore =
            context.pages().length;

        // Click product
        await this.firstProduct.click();

        // Wait a little for navigation or popup
        await this.page.waitForTimeout(1500);

        const pagesAfter =
            context.pages();

        // If a new tab opened
        if (pagesAfter.length > pagesBefore) {

            const newPage =
                pagesAfter[pagesAfter.length - 1];

            await newPage.waitForLoadState(
                'domcontentloaded'
            ).catch(() => {});

            return newPage;
        }

        // Product opened in same tab
        await this.page.waitForLoadState(
            'domcontentloaded'
        ).catch(() => {});

        return this.page;
    }
}


module.exports = { AmazonHomePage };