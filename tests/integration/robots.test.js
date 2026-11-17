import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { resolveSiteEnv } from '../../src/middleware/robots.js';

describe('SITE_ENV robots control', () => {
  it('staging sends X-Robots-Tag: noindex and the robots meta tag', async () => {
    const res = await request(createApp({ siteEnv: 'staging' })).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['x-robots-tag']).toBe('noindex');
    expect(res.text).toContain('<meta name="robots" content="noindex">');
  });

  it('staging sends noindex on responses other than the homepage, including 404s', async () => {
    const res = await request(createApp({ siteEnv: 'staging' })).get('/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.headers['x-robots-tag']).toBe('noindex');
  });

  it('production sends neither the header nor the meta tag', async () => {
    const res = await request(createApp({ siteEnv: 'production' })).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['x-robots-tag']).toBeUndefined();
    expect(res.text).not.toMatch(/noindex/i);
  });

  it('development and test are also noindex (fail-closed, D-020)', async () => {
    for (const siteEnv of ['development', 'test']) {
      const res = await request(createApp({ siteEnv })).get('/');
      expect(res.headers['x-robots-tag']).toBe('noindex');
    }
  });

  it('refuses to start with a missing or unknown SITE_ENV', () => {
    // createApp({ siteEnv: undefined }) falls back to process.env, so test the resolver directly.
    expect(() => resolveSiteEnv(undefined)).toThrow(/SITE_ENV/);
    expect(() => createApp({ siteEnv: '' })).toThrow(/SITE_ENV/);
    expect(() => createApp({ siteEnv: 'prod' })).toThrow(/SITE_ENV/);
    expect(() => createApp({ siteEnv: 'Production' })).toThrow(/SITE_ENV/);
  });
});

describe('placeholder homepage', () => {
  it('serves the build-in-progress text with Cache-Control: no-store', async () => {
    const res = await request(createApp({ siteEnv: 'production' })).get('/');
    expect(res.headers['cache-control']).toBe('no-store');
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.text).toContain('WinningThruChange build in progress');
  });

  it('does not advertise Express', async () => {
    const res = await request(createApp({ siteEnv: 'production' })).get('/');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
