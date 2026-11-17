import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { defineConfig, devices } from '@playwright/test';

const testEnv = parseEnv(readFileSync(new URL('./.env.test', import.meta.url), 'utf8'));
const port = Number(testEnv.PORT) || 3100;

// Viewports required by CLAUDE.md and spec section 10.
const widths = [1440, 1024, 768, 390, 360];

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: widths.map((width) => ({
    name: `chromium-${width}`,
    use: { ...devices['Desktop Chrome'], viewport: { width, height: 900 } },
  })),
  webServer: {
    command: 'node src/server.js',
    url: `http://localhost:${port}`,
    env: { ...testEnv },
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
