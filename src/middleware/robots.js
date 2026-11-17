// Environment-based robots control (CLAUDE.md "Environments", decision D-020).
// Fail-closed: every SITE_ENV except "production" is kept out of search.

export const SITE_ENVS = Object.freeze(['development', 'test', 'staging', 'production']);

export function resolveSiteEnv(value) {
  if (!SITE_ENVS.includes(value)) {
    throw new Error(
      `SITE_ENV must be one of ${SITE_ENVS.join(', ')}; got ${value === undefined ? 'nothing' : JSON.stringify(value)}.`,
    );
  }
  return value;
}

export function robotsHeaders(siteEnv) {
  const noindex = siteEnv !== 'production';
  return function robots(req, res, next) {
    res.locals.robotsNoindex = noindex;
    if (noindex) res.set('X-Robots-Tag', 'noindex');
    next();
  };
}
