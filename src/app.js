// Express app factory. Tests import this; src/server.js starts it.
import express from 'express';
import { resolveSiteEnv, robotsHeaders } from './middleware/robots.js';

// Kickoff placeholder. Replaced by the Nunjucks homepage in Phase 1.
// The text is the one string the kickoff brief specifies; nothing else is shown.
function placeholderPage({ robotsNoindex }) {
  const robotsMeta = robotsNoindex ? '\n    <meta name="robots" content="noindex">' : '';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">${robotsMeta}
    <title>WinningThruChange build in progress</title>
  </head>
  <body>
    <main>
      <p>WinningThruChange build in progress</p>
    </main>
  </body>
</html>
`;
}

export function createApp({ siteEnv = process.env.SITE_ENV } = {}) {
  const env = resolveSiteEnv(siteEnv);
  const app = express();

  app.disable('x-powered-by');
  app.set('siteEnv', env);
  app.use(robotsHeaders(env));

  app.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store');
    res.type('html').send(placeholderPage({ robotsNoindex: res.locals.robotsNoindex }));
  });

  return app;
}
