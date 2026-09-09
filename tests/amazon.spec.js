const { test, expect } = require('@playwright/test');

const { AmazonHomePage } = require('../pages/AmazonHomePage');
const { AmazonProductPage } = require('../pages/AmazonProductPage');
const { AmazonCartPage } = require('../pages/AmazonCartPage');

const productData = require('../test-data/products.json');


for (const product of productData.products) {

    test(
        `User should be able to search and add ${product} to cart`,
        async ({ page }) => {

            // Create Amazon Home Page object
            const amazonHomePage = new AmazonHomePage(page);


            // Open Amazon
            await amazonHomePage.goto();


            // Search for product
            await amazonHomePage.searchProduct(product);


            // Verify search results URL
            await expect(page).toHaveURL(/s/);


            // Verify search results are visible
            await expect(
                amazonHomePage.searchResults.first()
            ).toBeVisible();


            // Click first product
            const productPage =
                await amazonHomePage.clickFirstProduct();


            // Wait for product page to load
            await productPage.waitForLoadState(
                'domcontentloaded'
            );


            // Create Amazon Product Page object
            const amazonProductPage =
                new AmazonProductPage(productPage);


            // Verify product title is visible
            await expect(
                amazonProductPage.productTitle
            ).toBeVisible();


            // Add product to cart
            await amazonProductPage.addToCart();


            // Handle popup if it appears
            await amazonProductPage.handleCartPopup();


            // Verify product was added
            await amazonProductPage.verifyAddedToCart();


            // Go to Cart
            await amazonProductPage.goToCart();


            // Create Amazon Cart Page object
            const amazonCartPage =
                new AmazonCartPage(productPage);


            // Verify cart page loaded
            await amazonCartPage.verifyCartPage();


            // Verify cart heading is visible
            await expect(
                amazonCartPage.cartHeading
            ).toBeVisible();


            // Verify cart has products
            const cartHasProducts =
                await amazonCartPage.verifyCartHasProducts();

            expect(cartHasProducts).toBeTruthy();

        }
    );
}