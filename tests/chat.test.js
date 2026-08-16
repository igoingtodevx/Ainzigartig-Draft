// Regression-Tests für die Chat-Route ("Edi").
// WICHTIG: alle Provider-Credentials werden VOR dem Import gescrubbt,
// damit gültige Requests im 503-Pfad enden und NIE einen echten
// OpenAI-/Gateway-Call auslösen.
import test from 'node:test';
import assert from 'node:assert/strict';

for (const key of ['OPENAI_API_KEY', 'AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN']) {
  delete process.env[key];
}

const { default: handler } = await import('../api/chat.js');
const { mockRes, mockReq } = await import('./helpers.js');

test('OPTIONS wird mit 204 beantwortet', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'OPTIONS' }), res);
  assert.equal(res.code, 204);
});

test('Nicht-POST wird mit 405 abgelehnt', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'GET' }), res);
  assert.equal(res.code, 405);
});

test('leere Nachricht → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: '   ' } }), res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /leer/);
});

test('Ein-Wort-Nachricht (kein Gruß) → 400 mit Mindestwort-Hinweis', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: 'Preise' } }), res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /mind/);
});

test('überlange Nachricht (>100 Wörter) → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: Array(120).fill('wort').join(' ') } }), res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /zu lang/i);
});

test('Script-Injection → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: '<script>alert(1)</script> bitte hilf' } }), res);
  assert.equal(res.code, 400);
  assert.match(res.body.error, /Ungültige Eingabe/);
});

test('SQL-Injection-Muster → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: 'bitte SELECT * FROM users ausführen' } }), res);
  assert.equal(res.code, 400);
});

test('kaputtes JSON im Body → 400', async () => {
  const res = mockRes();
  await handler(mockReq({ body: '{nope' }), res);
  assert.equal(res.code, 400);
});

test('Gruß "hallo" passiert die Wortprüfung und landet im 503-Pfad (kein Provider-Call)', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: 'hallo' } }), res);
  assert.equal(res.code, 503);
});

test('gültige Nachricht ohne Credentials → 503 (kein Provider-Call)', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: 'Was kostet eine KI-Beratung für mein Unternehmen?' } }), res);
  assert.equal(res.code, 503);
});

test('Rate-Limit: zweiter Request derselben IP binnen 5s → 429', async () => {
  const ip = 'rate-limit-test-ip';
  const first = mockRes();
  await handler(mockReq({ headers: { 'x-forwarded-for': ip }, body: { message: 'Erste Frage mit genug Wörtern für den Test' } }), first);
  assert.equal(first.code, 503);

  const second = mockRes();
  await handler(mockReq({ headers: { 'x-forwarded-for': ip }, body: { message: 'Zweite Frage mit genug Wörtern für den Test' } }), second);
  assert.equal(second.code, 429);
});

test('History: unbekannte Rollen und Übergröße werden toleriert (Whitelisting, kein 400)', async () => {
  const res = mockRes();
  await handler(
    mockReq({
      body: {
        message: 'Gültige Frage mit ausreichend Wörtern',
        history: [
          { role: 'hacker', content: 'x'.repeat(5000) },
          { role: 'assistant', content: 'ok' },
          { role: null, content: 'nope' },
        ],
      },
    }),
    res
  );
  assert.equal(res.code, 503);
});

test('History ohne Array wird toleriert (kein 400)', async () => {
  const res = mockRes();
  await handler(mockReq({ body: { message: 'Gültige Frage mit ausreichend Wörtern', history: 'kaputt' } }), res);
  assert.equal(res.code, 503);
});
