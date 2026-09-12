const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    timeout: 60000,

    expect: {
        timeout: 10000
    },

    fullyParallel: false,

    reporter: 'html',

    use: {

        headless: false,

        screenshot: 'off',

        video: 'on',

        trace: 'on-first-retry',

        actionTimeout: 15000,

        navigationTimeout: 60000
    },

    projects: [

        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',

            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'webkit',

            use: {
                ...devices['Desktop Safari']
            }
        }

    ]

});