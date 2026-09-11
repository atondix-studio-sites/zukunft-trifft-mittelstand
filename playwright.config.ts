import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: "http://127.0.0.1:3107", trace: "retain-on-failure" },
  webServer: { command: "pnpm exec next dev --hostname 127.0.0.1 --port 3107", url: "http://127.0.0.1:3107", env: { ATONDIX_STUDIO_SITE_TOKEN: "test-only-not-a-real-token" }, reuseExistingServer: false, timeout: 120_000 },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
    { name: "narrow-mobile", use: { viewport: { width: 320, height: 780 }, isMobile: true, hasTouch: true } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
  ],
});
