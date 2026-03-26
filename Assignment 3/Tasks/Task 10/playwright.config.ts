import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    // FIX 1: Invisible on GitHub (CI), visible on your local laptop
    headless: !!process.env.CI,

    trace: 'on-first-retry',

    // FIX 2: Run at maximum speed on GitHub, but slow it down locally so you can watch
    launchOptions: {
      slowMo: process.env.CI ? 0 : 300,
    },
  },

  // ✅ ONLY Chromium
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // FIX 3: Force Vite to strictly use port 5173 (it sometimes randomly picks 5174)
    command: 'npm run dev -- --port 5173',

    // FIX 4: Use explicit IPv4 address to fix the 60-second timeout bug!
    url: 'http://127.0.0.1:5173',

    reuseExistingServer: !process.env.CI,
  },
});
