const { test, expect } = require('@playwright/test');

const {
    AmazonHomePage
} = require('../pages/AmazonHomePage');

const {
    AmazonProductPage
} = require('../pages/AmazonProductPage');

const {
    AmazonCartPage
} = require('../pages/AmazonCartPage');

const productData =
    require('../test-data/products.json');


// Increase timeout for Amazon
test.setTimeout(90000);


for (const product of productData.products) {

    test(
        `User should be able to search and add ${product} to cart`,

        async ({ page }) => {

            // HOME PAGE
            const amazonHomePage =
                new AmazonHomePage(page);

            await amazonHomePage.goto();


            // SEARCH PRODUCT
            await amazonHomePage.searchProduct(
                product
            );


            // Verify search URL
            await expect(page).toHaveURL(
                /amazon\.in\/s/
            );


            // Verify search results
            await expect(
                amazonHomePage.searchResults
            ).toBeVisible();


            // OPEN PRODUCT
            const productPage =
                await amazonHomePage
                    .clickFirstProduct();


            // PRODUCT PAGE
            const amazonProductPage =
                new AmazonProductPage(
                    productPage
                );


            // Verify product page
            await expect(
                amazonProductPage.productTitle
            ).toBeVisible({
                timeout: 30000
            });


            // ADD TO CART
            await amazonProductPage.addToCart();


            // HANDLE OPTIONAL POPUP
            await amazonProductPage
                .handleCartPopup();


            // VERIFY PRODUCT ADDED
            const productAdded =
                await amazonProductPage
                    .verifyAddedToCart();

            console.log(
                `Product: ${product}`
            );

            console.log(
                `Added to cart: ${productAdded}`
            );


            // GO TO CART
            await amazonProductPage.goToCart();


            // CART PAGE
            const amazonCartPage =
                new AmazonCartPage(
                    productPage
                );


            // Verify cart page
            await amazonCartPage
                .verifyCartPage();


            // Verify cart heading
            await expect(
                amazonCartPage.cartHeading
            ).toBeVisible({
                timeout: 30000
            });


            // Verify cart has products
            const cartHasProducts =
                await amazonCartPage
                    .verifyCartHasProducts();


            expect(
                cartHasProducts
            ).toBeTruthy();

        }
    );
}