import test from 'node:test';
import assert from 'node:assert/strict';
import { enforcePublicPost, readJsonBody, reserveAiBudget } from '../server/apiGuard.js';
import analyzeHandler from '../api/analyze.js';

test('analyze rejects malformed and private bracketed IPv6 URLs before external calls', async () => {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'test';
  try {
    for (const [url, ip, message] of [
      ['https://[2001:db8::1', '198.51.100.41', 'INVALID_URL'],
      ['https://[::1]/', '198.51.100.42', 'URL_NOT_PUBLIC'],
    ]) {
      const res = responseDouble();
      await analyzeHandler({ method: 'POST', body: { url }, headers: { host: 'ainzigartig.vercel.app', 'content-type': 'application/json', 'x-forwarded-for': ip } }, res);
      assert.equal(res.statusCode, 400);
      assert.equal(res.payload.code, message);
    }
  } finally {
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;
  }
});

function responseDouble() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };
}

function request(headers = {}) {
  return {
    method: 'POST',
    headers: {
      host: 'ainzigartig.vercel.app',
      'content-type': 'application/json',
      'user-agent': 'guard-test',
      'x-forwarded-for': '203.0.113.10',
      ...headers,
    },
  };
}

const OPTIONS = {
  namespace: `guard-test-${process.pid}`,
  limit: 2,
  windowMs: 60_000,
  minIntervalMs: 1_000,
  maxBodyBytes: 100,
};

test('public mutation guard rejects cross-site browser requests', async () => {
  const res = responseDouble();
  const allowed = await enforcePublicPost(request({
    origin: 'https://attacker.example',
    'sec-fetch-site': 'cross-site',
  }), res, OPTIONS);

  assert.equal(allowed, false);
  assert.equal(res.statusCode, 403);
  assert.equal(res.payload.code, 'ORIGIN_REJECTED');
});

test('public mutation guard rejects declared oversized bodies', async () => {
  const res = responseDouble();
  const allowed = await enforcePublicPost(request({ 'content-length': '101' }), res, {
    ...OPTIONS,
    namespace: `${OPTIONS.namespace}-size`,
  });

  assert.equal(allowed, false);
  assert.equal(res.statusCode, 413);
  assert.equal(res.payload.code, 'PAYLOAD_TOO_LARGE');
});

test('public mutation guard enforces a per-client cooldown', async () => {
  const options = { ...OPTIONS, namespace: `${OPTIONS.namespace}-cooldown` };
  const first = responseDouble();
  const second = responseDouble();

  assert.equal(await enforcePublicPost(request(), first, options), true);
  assert.equal(await enforcePublicPost(request(), second, options), false);
  assert.equal(second.statusCode, 429);
  assert.equal(second.payload.code, 'COOLDOWN');
  assert.equal(second.headers['Retry-After'], '1');
});

test('JSON reader checks the actual serialized body size', async () => {
  const req = { body: { message: 'x'.repeat(120) } };
  await assert.rejects(() => readJsonBody(req, 100), (error) => error.code === 'PAYLOAD_TOO_LARGE');
});

function restoreEnvironment(previous) {
  for (const [name, value] of Object.entries(previous)) {
    if (value === undefined) delete process.env[name]; else process.env[name] = value;
  }
}

test('production AI guard fails closed without a distributed store', async () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  };
  process.env.NODE_ENV = 'production';
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    const res = responseDouble();
    const allowed = await enforcePublicPost(request(), res, { ...OPTIONS, requireDistributed: true });
    assert.equal(allowed, false);
    assert.equal(res.statusCode, 503);
    assert.equal(res.payload.code, 'ABUSE_PROTECTION_UNAVAILABLE');
  } finally {
    restoreEnvironment(previous);
  }
});

test('Vercel limiter keys ignore a spoofed x-forwarded-for value', async () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  };
  const previousFetch = globalThis.fetch;
  const commands = [];
  process.env.NODE_ENV = 'production';
  process.env.VERCEL = '1';
  process.env.KV_REST_API_URL = 'https://rate-limit.example';
  process.env.KV_REST_API_TOKEN = 'test-only';
  globalThis.fetch = async (_url, options) => {
    commands.push(JSON.parse(options.body));
    return { ok: true, async json() { return { result: [1, 0, 1, 1, 60_000] }; } };
  };

  try {
    for (const spoofed of ['198.51.100.1', '198.51.100.200']) {
      const res = responseDouble();
      const allowed = await enforcePublicPost(request({
        'x-vercel-forwarded-for': '203.0.113.77',
        'x-forwarded-for': spoofed,
      }), res, { ...OPTIONS, namespace: 'trusted-ip-test', minIntervalMs: 0, requireDistributed: true });
      assert.equal(allowed, true);
    }
    assert.equal(commands.length, 2);
    assert.equal(commands[0][3], commands[1][3]);
    assert.equal(JSON.stringify(commands).includes('203.0.113.77'), false);
    assert.equal(JSON.stringify(commands).includes('198.51.100.'), false);
  } finally {
    globalThis.fetch = previousFetch;
    restoreEnvironment(previous);
  }
});

test('distributed account budget blocks model calls after the hard ceiling', async () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
  };
  const previousFetch = globalThis.fetch;
  process.env.NODE_ENV = 'production';
  process.env.KV_REST_API_URL = 'https://rate-limit.example';
  process.env.KV_REST_API_TOKEN = 'test-only';
  globalThis.fetch = async () => ({ ok: true, async json() { return { result: [0, 500, 0] }; } });

  try {
    const res = responseDouble();
    assert.equal(await reserveAiBudget(res, 1), false);
    assert.equal(res.statusCode, 429);
    assert.equal(res.payload.code, 'AI_BUDGET_EXHAUSTED');
    assert.ok(Number(res.headers['Retry-After']) > 0);
  } finally {
    globalThis.fetch = previousFetch;
    restoreEnvironment(previous);
  }
});
