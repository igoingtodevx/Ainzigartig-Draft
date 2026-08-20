// Regression-Tests für den Origin-Check der Live-Agent-Demo-Route.
// WICHTIG: alle Provider-Credentials werden VOR dem Import gescrubbt,
// damit gültige Requests im 502-Pfad enden und NIE einen echten
// OpenAI-/Gateway-Call auslösen.
import test from 'node:test';
import assert from 'node:assert/strict';

for (const key of ['OPENAI_API_KEY', 'AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN']) {
  delete process.env[key];
}

const { default: handler } = await import('../api/live-agent-demo.js');
const { mockRes, mockReq } = await import('./helpers.js');

test('fremder Origin → 403, kein Provider-Call', async () => {
  const res = mockRes();
  await handler(mockReq({ headers: { origin: 'https://evil-site.example' }, body: { mode: 'sample', text: 'Rechnung über 500 EUR' } }), res);
  assert.equal(res.code, 403);
});

test('fehlender Origin-Header wird toleriert (nicht-Browser-Client)', async () => {
  const res = mockRes();
  await handler(mockReq({ headers: { origin: undefined }, method: 'GET' }), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.service, 'live-agent-demo');
});

test('OPTIONS wird mit 200 beantwortet', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'OPTIONS' }), res);
  assert.equal(res.code, 200);
});

test('GET liefert Status ohne echte Credentials', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'GET' }), res);
  assert.equal(res.code, 200);
  assert.equal(res.body.has_llm, false);
});

test('gültiger Origin, mode=sample ohne Credentials → 502 (kein Provider-Call)', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { mode: 'sample', text: 'Rechnung über 500 EUR, fällig 30.09.' } }), res);
  assert.equal(res.code, 502);
});
