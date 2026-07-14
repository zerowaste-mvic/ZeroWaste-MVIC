// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: 0,

  workers: 1,

  reporter: [["html"], ["list"]],

  use: {
    baseURL: "http://localhost:5174",

    // Opens the browser so you can watch the test
    headless: false,

    // Takes screenshots
    screenshot: "on",

    // Records video
    video: "on",

    // Records trace
    trace: "on",

    // Slow down each Playwright action (milliseconds)
    actionTimeout: 10000,

    launchOptions: {
      slowMo: 500,
    },
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    // Uncomment these if you want Firefox and Safari too.
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"]
    //   }
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"]
    //   }
    // }
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5174",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
