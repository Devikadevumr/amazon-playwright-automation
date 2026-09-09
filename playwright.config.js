const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    // Folder where test files are located
    testDir: './tests',

    // Maximum time for each test
    timeout: 30000,

    // Number of retries if a test fails
    retries: 0,

    // Reporters
    reporter: [
        ['html'],
        ['list']
    ],

    // Settings for browser and test execution
    use: {

        // Run browser visibly
        headless: false,

        // Do not take screenshots
        screenshot: 'off',

        // Record video for every test
        video: 'on',

        // Save trace on first retry
        trace: 'on-first-retry'
    },

    // Browser configurations
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