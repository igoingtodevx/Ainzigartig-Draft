import { createHash } from 'node:crypto';

const GLOBAL_KEY = '__ainzigartig_api_rate_limits_v2__';
const MAX_BUCKETS = 5_000;
const STORE_TIMEOUT_MS = 1_800;
const DEFAULT_DAILY_AI_BUDGET_UNITS = 500;

const RATE_LIMIT_SCRIPT = `
local count = tonumber(redis.call('GET', KEYS[1]) or '0')
local last = tonumber(redis.call('GET', KEYS[2]) or '0')
local now = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local window = tonumber(ARGV[3])
local minimum = tonumber(ARGV[4])
if last > 0 and minimum > 0 and now - last < minimum then
  return {0, 1, count, math.max(0, limit - count), minimum - (now - last)}
end
if count >= limit then
  local ttl = redis.call('PTTL', KEYS[1])
  if ttl < 1 then ttl = window end
  return {0, 2, count, 0, ttl}
end
count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('PEXPIRE', KEYS[1], window) end
redis.call('SET', KEYS[2], now, 'PX', window)
local ttl = redis.call('PTTL', KEYS[1])
if ttl < 1 then ttl = window end
return {1, 0, count, math.max(0, limit - count), ttl}
`;

const AI_BUDGET_SCRIPT = `
local used = tonumber(redis.call('GET', KEYS[1]) or '0')
local units = tonumber(ARGV[1])
local budget = tonumber(ARGV[2])
local ttl = tonumber(ARGV[3])
if used + units > budget then
  return {0, used, math.max(0, budget - used)}
end
used = redis.call('INCRBY', KEYS[1], units)
if used == units then redis.call('EXPIRE', KEYS[1], ttl) end
return {1, used, math.max(0, budget - used)}
`;

function header(req, name) {
  const value = req?.headers?.[name] ?? req?.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : String(value || '');
}

function sendError(res, status, error, code) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json({ error, code });
}

function allowedOrigins(req) {
  const values = new Set();
  const configured = [process.env.PUBLIC_SITE_ORIGIN, process.env.ALLOWED_ORIGINS]
    .filter(Boolean)
    .join(',')
    .split(',')
    .map((value) => value.trim().replace(/\/$/, ''))
    .filter(Boolean);
  configured.forEach((value) => values.add(value));

  // Local host discovery is a development convenience only. Production must
  // explicitly declare its public/preview origins instead of trusting Host.
  if (process.env.NODE_ENV !== 'production') {
    const host = header(req, 'x-forwarded-host') || header(req, 'host');
    if (host) {
      values.add(`https://${host}`);
      if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) values.add(`http://${host}`);
    }
  }
  return values;
}

export function isAllowedOrigin(req) {
  if (header(req, 'sec-fetch-site').toLowerCase() === 'cross-site') return false;
  const origin = header(req, 'origin').replace(/\/$/, '');
  if (!origin) return true; // Non-browser clients are controlled by distributed quotas.
  return allowedOrigins(req).has(origin);
}

export function handleOptions(req, res, methods = ['POST']) {
  if (req.method !== 'OPTIONS') return false;
  if (!isAllowedOrigin(req)) {
    sendError(res, 403, 'Cross-Site-Anfragen sind nicht erlaubt.', 'ORIGIN_REJECTED');
    return true;
  }
  const origin = header(req, 'origin');
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', [...methods, 'OPTIONS'].join(', '));
  res.setHeader('Access-Control-Max-Age', '600');
  res.status(204).end();
  return true;
}

function firstForwardedAddress(value) {
  return String(value || '').split(',')[0].trim().slice(0, 120);
}

function trustedClientAddress(req) {
  if (process.env.VERCEL === '1') {
    return firstForwardedAddress(header(req, 'x-vercel-forwarded-for') || header(req, 'x-forwarded-for')) || 'unknown';
  }
  const configuredHeader = String(process.env.TRUSTED_CLIENT_IP_HEADER || '').trim().toLowerCase();
  if (/^[a-z0-9-]+$/.test(configuredHeader)) {
    const configuredAddress = firstForwardedAddress(header(req, configuredHeader));
    if (configuredAddress) return configuredAddress;
  }
  const socketAddress = firstForwardedAddress(req?.socket?.remoteAddress);
  if (socketAddress) return socketAddress;
  if (process.env.NODE_ENV !== 'production') {
    return firstForwardedAddress(header(req, 'x-vercel-forwarded-for') || header(req, 'x-forwarded-for') || header(req, 'x-real-ip')) || 'unknown';
  }
  return 'unknown';
}

function clientKey(req, namespace) {
  const digest = createHash('sha256').update(trustedClientAddress(req)).digest('hex').slice(0, 32);
  return `${keyPrefix()}:rate:${namespace}:${digest}`;
}

function keyPrefix() {
  const configured = String(process.env.RATE_LIMIT_KEY_PREFIX || 'ainzigartig').replace(/[^a-z0-9:_-]/gi, '').slice(0, 60);
  return configured || 'ainzigartig';
}

function memoryStore() {
  if (!globalThis[GLOBAL_KEY]) globalThis[GLOBAL_KEY] = new Map();
  return globalThis[GLOBAL_KEY];
}

function pruneBuckets(buckets, now) {
  for (const [key, record] of buckets) {
    if (record.resetAt <= now) buckets.delete(key);
  }
  while (buckets.size >= MAX_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (!oldest) break;
    buckets.delete(oldest);
  }
}

function distributedStoreConfig() {
  const candidates = [
    [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN],
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
  ];
  for (const [rawUrl, rawToken] of candidates) {
    const token = String(rawToken || '').trim();
    if (!rawUrl || !token) continue;
    try {
      const url = new URL(String(rawUrl).trim());
      if (url.protocol !== 'https:' || url.username || url.password) continue;
      return { url: url.toString().replace(/\/$/, ''), token };
    } catch {}
  }
  return null;
}

export function isDistributedRateLimitConfigured() {
  return !!distributedStoreConfig();
}

export function isAiAbuseProtectionReady() {
  return isDistributedRateLimitConfigured() || process.env.NODE_ENV !== 'production';
}

async function runRedisScript(config, script, keys, args) {
  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['EVAL', script, String(keys.length), ...keys, ...args.map(String)]),
    signal: AbortSignal.timeout(STORE_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`store_status_${response.status}`);
  const payload = await response.json();
  if (payload?.error || !Array.isArray(payload?.result)) throw new Error('store_invalid_response');
  return payload.result.map(Number);
}

function consumeMemoryLimit(key, options, now) {
  const buckets = memoryStore();
  if (buckets.size >= MAX_BUCKETS) pruneBuckets(buckets, now);
  let record = buckets.get(key);
  if (!record || record.resetAt <= now) record = { count: 0, resetAt: now + options.windowMs, lastAt: 0 };

  const waitMs = options.minIntervalMs - (now - record.lastAt);
  if (record.lastAt && waitMs > 0) {
    return { allowed: false, reason: 'cooldown', count: record.count, remaining: Math.max(0, options.limit - record.count), retryMs: waitMs, resetAt: record.resetAt };
  }
  if (record.count >= options.limit) {
    return { allowed: false, reason: 'rate', count: record.count, remaining: 0, retryMs: record.resetAt - now, resetAt: record.resetAt };
  }
  record.count += 1;
  record.lastAt = now;
  buckets.set(key, record);
  return { allowed: true, count: record.count, remaining: Math.max(0, options.limit - record.count), retryMs: 0, resetAt: record.resetAt };
}

async function consumeDistributedLimit(config, key, options, now) {
  const [allowed, reasonCode, count, remaining, retryMs] = await runRedisScript(
    config,
    RATE_LIMIT_SCRIPT,
    [key, `${key}:last`],
    [now, options.limit, options.windowMs, options.minIntervalMs],
  );
  return {
    allowed: allowed === 1,
    reason: reasonCode === 1 ? 'cooldown' : 'rate',
    count,
    remaining,
    retryMs,
    resetAt: now + retryMs,
  };
}

export async function enforcePublicPost(req, res, options) {
  const {
    namespace,
    limit,
    windowMs,
    minIntervalMs = 0,
    maxBodyBytes,
    requireDistributed = false,
  } = options;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendError(res, 405, 'Diese Methode wird nicht unterstützt.', 'METHOD_NOT_ALLOWED');
    return false;
  }
  if (!isAllowedOrigin(req)) {
    sendError(res, 403, 'Cross-Site-Anfragen sind nicht erlaubt.', 'ORIGIN_REJECTED');
    return false;
  }
  const contentType = header(req, 'content-type').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    sendError(res, 415, 'Bitte senden Sie JSON.', 'UNSUPPORTED_MEDIA_TYPE');
    return false;
  }
  const contentLength = Number(header(req, 'content-length') || 0);
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    sendError(res, 413, 'Die Anfrage ist zu groß.', 'PAYLOAD_TOO_LARGE');
    return false;
  }

  const now = Date.now();
  const config = distributedStoreConfig();
  if (!config && requireDistributed && process.env.NODE_ENV === 'production') {
    sendError(res, 503, 'Die Missbrauchsbegrenzung ist derzeit nicht verfügbar.', 'ABUSE_PROTECTION_UNAVAILABLE');
    return false;
  }

  let result;
  try {
    result = config
      ? await consumeDistributedLimit(config, clientKey(req, namespace), { limit, windowMs, minIntervalMs }, now)
      : consumeMemoryLimit(clientKey(req, namespace), { limit, windowMs, minIntervalMs }, now);
  } catch (error) {
    console.error('Rate-limit store unavailable', error?.name || 'error');
    sendError(res, 503, 'Die Missbrauchsbegrenzung ist derzeit nicht verfügbar.', 'ABUSE_PROTECTION_UNAVAILABLE');
    return false;
  }

  if (!result.allowed) {
    const retryAfter = Math.max(1, Math.ceil(result.retryMs / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    sendError(
      res,
      429,
      result.reason === 'cooldown' ? `Bitte warten Sie ${retryAfter} Sekunden.` : 'Das Anfragekontingent ist vorübergehend ausgeschöpft.',
      result.reason === 'cooldown' ? 'COOLDOWN' : 'RATE_LIMITED',
    );
    return false;
  }

  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(result.remaining));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)));
  return true;
}

function dailyBudgetLimit() {
  const configured = Number(process.env.AI_DAILY_BUDGET_UNITS);
  return Number.isInteger(configured) && configured > 0 ? Math.min(configured, 1_000_000) : DEFAULT_DAILY_AI_BUDGET_UNITS;
}

function utcBudgetWindow(now) {
  const date = new Date(now);
  const day = date.toISOString().slice(0, 10);
  const nextMidnight = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1);
  return { day, retryMs: Math.max(1_000, nextMidnight - now), ttlSeconds: Math.max(3_600, Math.ceil((nextMidnight - now) / 1000) + 3_600) };
}

export async function reserveAiBudget(res, units) {
  const normalizedUnits = Math.max(1, Math.min(100, Math.ceil(Number(units) || 1)));
  const budget = dailyBudgetLimit();
  const now = Date.now();
  const window = utcBudgetWindow(now);
  const key = `${keyPrefix()}:ai-budget:${window.day}`;
  const config = distributedStoreConfig();

  if (!config && process.env.NODE_ENV === 'production') {
    sendError(res, 503, 'Die Kostenbegrenzung ist derzeit nicht verfügbar.', 'ABUSE_PROTECTION_UNAVAILABLE');
    return false;
  }

  let allowed;
  try {
    if (config) {
      const [accepted] = await runRedisScript(config, AI_BUDGET_SCRIPT, [key], [normalizedUnits, budget, window.ttlSeconds]);
      allowed = accepted === 1;
    } else {
      const buckets = memoryStore();
      const record = buckets.get(key) || { count: 0, resetAt: now + window.retryMs, lastAt: 0 };
      allowed = record.count + normalizedUnits <= budget;
      if (allowed) {
        record.count += normalizedUnits;
        buckets.set(key, record);
      }
    }
  } catch (error) {
    console.error('AI budget store unavailable', error?.name || 'error');
    sendError(res, 503, 'Die Kostenbegrenzung ist derzeit nicht verfügbar.', 'ABUSE_PROTECTION_UNAVAILABLE');
    return false;
  }

  if (!allowed) {
    res.setHeader('Retry-After', String(Math.ceil(window.retryMs / 1000)));
    sendError(res, 429, 'Das tägliche KI-Demo-Kontingent ist ausgeschöpft.', 'AI_BUDGET_EXHAUSTED');
    return false;
  }
  return true;
}

export async function readJsonBody(req, maxBodyBytes) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    const size = Buffer.byteLength(JSON.stringify(req.body));
    if (size > maxBodyBytes) throw Object.assign(new Error('payload'), { code: 'PAYLOAD_TOO_LARGE' });
    return req.body;
  }

  const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body || '');
  if (Buffer.byteLength(raw) > maxBodyBytes) throw Object.assign(new Error('payload'), { code: 'PAYLOAD_TOO_LARGE' });
  const parsed = JSON.parse(raw || '{}');
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid');
  return parsed;
}
