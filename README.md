# Amazon Automation Testing Project

## Project Description

This project automates Amazon product search and cart functionality using Playwright with JavaScript.

The project follows the Page Object Model (POM) design pattern and uses data-driven testing with JSON.

---

## Features

- Search products on Amazon
- Select a product from search results
- Add products to the cart
- Navigate to the cart
- Verify product page
- Data-driven testing using JSON
- Page Object Model (POM)
- Cross-browser testing
- HTML test reports
- Video recording for test execution

---

## Products Tested

- Laptop
- Mobile
- Headphones

---

## Browsers Tested

- Chromium
- Firefox
- WebKit

---

## Project Structure

```text
amazon-automation/
│
├── .github/
│
├── pages/
│   ├── AmazonCartPage.js
│   ├── AmazonHomePage.js
│   └── AmazonProductPage.js
│
├── test-data/
│   └── products.json
│
├── tests/
│   ├── amazon.spec.js
│   └── example.spec.js
│
├── utils/
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── playwright.config.js