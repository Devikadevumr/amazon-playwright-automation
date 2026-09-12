const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    // Test folder
    testDir: './tests',

    // Run tests
    fullyParallel: false,

    // Fail CI if test.only is used
    forbidOnly: !!process.env.CI,

    // Retry failed tests
    retries: process.env.CI ? 2 : 0,

    // Run one test at a time
    workers: 1,

    // Reporter
    reporter: 'html',

    // Global test settings
    use: {

        // Show browser while testing
        headless: false,

        // Screenshot for every test
        screenshot: 'on',

        // Record video for every test
        video: 'on',

        // Trace on first retry
        trace: 'on-first-retry'

    },


    // Browser projects
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