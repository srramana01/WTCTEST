// Entry point: reads env, starts the app.
import { existsSync } from 'node:fs';
import { createApp } from './app.js';

// Local development reads .env if present (decision D-019). On Hostinger, hPanel sets the variables.
if (existsSync('.env')) process.loadEnvFile('.env');

const app = createApp();
const port = Number(process.env.PORT) || 3000;
const siteEnv = app.get('siteEnv');

app.listen(port, () => {
  const robots = siteEnv === 'production' ? 'indexable' : 'noindex on every response';
  console.log(`WinningThruChange listening on port ${port}. SITE_ENV=${siteEnv} (${robots}).`);
});
