// Regression-Tests für die Website-Analyse-Route: SSRF-Guard und
// URL-Validierung. Provider-Credentials + Scraper-URL werden gescrubbt,
// damit keiner der Tests externen Traffic erzeugt.
import test from 'node:test';
import assert from 'node:assert/strict';

for (const key of ['OPENAI_API_KEY', 'AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN', 'SCRAPER_URL']) {
  delete process.env[key];
}

const { default: handler } = await import('../api/analyze.js');
const { mockRes, mockReq } = await import('./helpers.js');

test('GET ist ein Health-Check → 200', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'GET' }), res);
  assert.equal(res.code, 200);
});

test('Nicht unterstützte Methode → 405', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'PUT' }), res);
  assert.equal(res.code, 405);
});

const blockedCases = [
  ['localhost', 'http://localhost:3000', /Lokale oder interne/],
  ['127.0.0.1', 'http://127.0.0.1/admin', /Lokale oder interne/],
  ['192.168.x', 'http://192.168.1.10', /Lokale oder interne/],
  ['10.x', 'http://10.0.0.5', /Lokale oder interne/],
  ['172.16-31', 'http://172.20.4.1', /Lokale oder interne/],
  ['0.0.0.0', 'http://0.0.0.0', /Lokale oder interne/],
  ['::1', 'http://[::1]', /Lokale oder interne/],
  ['.local', 'http://server.local', /Lokale oder interne/],
  ['Credentials', 'https://user:pass@example.com', /Zugangsdaten/],
  ['ftp-Protokoll', 'ftp://example.com', /HTTP- und HTTPS/],
  ['Domain ohne Punkt', 'intranet', /öffentlich erreichbare Domain/],
];

for (const [name, url, pattern] of blockedCases) {
  test(`SSRF-Guard blockiert ${name} (${url})`, async () => {
    const res = mockRes();
    await handler(mockReq({ body: { url } }), res);
    assert.equal(res.code, 400, `erwartet 400, war ${res.code}: ${JSON.stringify(res.body)}`);
    assert.match(res.body.error, pattern);
  });
}

test('gültige öffentliche URL erreicht den Analyse-Pfad (kein 400, kein externer Call)', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { url: 'https://example.com' } }), res);
  assert.notEqual(res.code, 400, 'gültige URL darf nicht an der Validierung scheitern');
  // Ohne SCRAPER_URL endet der Request im 5xx-Pfad — der eigentliche Beweis ist "kein 400".
  assert.ok(res.code >= 500 && res.code < 600, `erwartet 5xx, war ${res.code}`);
});

test('Schema-freie URL wird automatisch zu https:// ergänzt', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { url: 'example.com' } }), res);
  assert.notEqual(res.code, 400, 'protokolllose Domain muss normalisiert werden');
  assert.ok(res.code >= 500 && res.code < 600);
});
