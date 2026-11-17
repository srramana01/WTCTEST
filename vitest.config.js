import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { defineConfig } from 'vitest/config';

// Tests always run against .env.test, never .env (CLAUDE.md: integration uses the test database).
const testEnv = parseEnv(readFileSync(new URL('./.env.test', import.meta.url), 'utf8'));

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.js', 'tests/integration/**/*.test.js'],
    environment: 'node',
    env: testEnv,
    // Integration tests will share one database from Phase 2; run files one at a time.
    fileParallelism: false,
  },
});
