import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = process.env.APP_ROOT || path.dirname(fileURLToPath(import.meta.url));
const DIST_ROOT = path.join(APP_ROOT, 'dist');
const PORT = Number(process.env.PORT || 3010);
const HOST = process.env.HOST || '127.0.0.1';
const SOCKET_PATH = process.env.SOCKET_PATH || '';
// Live-agent-demo accepts up to 5 images of 4 MB each (base64 ≈ 27 MB),
// so the global body cap must sit above that.
const MAX_BODY_BYTES = 24 * 1024 * 1024;
const API_MODULES = new Map([
  ['chat', './api/chat.js'],
  ['live-agent-demo', './api/live-agent-demo.js'],
  ['analyze', './api/analyze.js'],
  ['projects', './api/projects.js'],
  ['contact', './api/contact.js'],
  ['insights', './api/insights.js'],
]);

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function apiResponse(nodeResponse) {
  return {
    setHeader(name, value) {
      nodeResponse.setHeader(name, value);
      return this;
    },
    status(code) {
      nodeResponse.statusCode = code;
      return this;
    },
    json(data) {
      if (!nodeResponse.hasHeader('Content-Type')) {
        nodeResponse.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      nodeResponse.end(JSON.stringify(data));
    },
    end(data) {
      nodeResponse.end(data);
    },
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > MAX_BODY_BYTES) {
      const error = new Error('Request body too large');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  if (total === 0) return {};
  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw);
}

function safeStaticPath(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const relative = decoded.replace(/^\/+/, '');
  const candidate = path.resolve(DIST_ROOT, relative);
  if (candidate !== DIST_ROOT && !candidate.startsWith(`${DIST_ROOT}${path.sep}`)) return null;
  return candidate;
}

async function serveStatic(request, response) {
  const requested = safeStaticPath(new URL(request.url, `http://${request.headers.host || 'localhost'}`).pathname);
  if (!requested) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad request');
    return;
  }

  let filePath = requested;
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) filePath = path.join(DIST_ROOT, 'index.html');
  } catch {
    filePath = path.join(DIST_ROOT, 'index.html');
  }

  try {
    const body = await fs.readFile(filePath);
    const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': body.length,
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Application build is unavailable');
  }
}

async function handleApi(request, response, pathname) {
  const name = pathname.slice('/api/'.length).replace(/\/+$/, '');
  const modulePath = API_MODULES.get(name);
  if (!modulePath) {
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let handler;
  try {
    const loaded = await import(new URL(modulePath, import.meta.url));
    handler = loaded.default;
  } catch (error) {
    console.error('API module load failed:', name, error?.message || error);
    response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Internal server error' }));
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD' && request.method !== 'OPTIONS') {
    try {
      request.body = await readJsonBody(request);
    } catch (error) {
      if (error.statusCode === 413) {
        response.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'Request body too large' }));
        return;
      }
      request.body = undefined;
    }
  }

  const wrappedResponse = apiResponse(response);
  try {
    await handler(request, wrappedResponse);
    if (!response.writableEnded) {
      response.writeHead(204);
      response.end();
    }
  } catch (error) {
    console.error('API handler failed:', name, error?.message || error);
    if (!response.writableEnded) {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.end(JSON.stringify({ error: 'Internal server error' }));
    }
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (url.pathname === '/health' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({ status: 'ok', service: 'ainzigartig', version: process.env.APP_VERSION || 'unknown' }));
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    await handleApi(request, response, url.pathname);
    return;
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  await serveStatic(request, response);
});

server.requestTimeout = 120_000;
server.headersTimeout = 15_000;
server.keepAliveTimeout = 5_000;

async function startServer() {
  if (SOCKET_PATH) {
    await fs.rm(SOCKET_PATH, { force: true });
    server.listen(SOCKET_PATH, () => {
      console.log(`ainzigartig listening on unix://${SOCKET_PATH}`);
    });
    return;
  }
  server.listen(PORT, HOST, () => {
    console.log(`ainzigartig listening on http://${HOST}:${PORT}`);
  });
}

function shutdown(signal) {
  console.log(`${signal}: shutting down`);
  server.close(async () => {
    if (SOCKET_PATH) await fs.rm(SOCKET_PATH, { force: true });
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

startServer().catch((error) => {
  console.error('failed to start Ainzigartig server', error);
  process.exit(1);
});
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
