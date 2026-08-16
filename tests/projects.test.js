// Regression-Tests für die Projekt-Route: nur der methodische Rand
// (kein Netzwerk-Call im Test).
import test from 'node:test';
import assert from 'node:assert/strict';

delete process.env.GITHUB_TOKEN;

const { default: handler } = await import('../api/projects.js');
const { mockRes, mockReq } = await import('./helpers.js');

test('Nicht-GET → 405 (kein GitHub-Call)', async () => {
  const res = mockRes();
  await handler(mockReq({ method: 'POST' }), res);
  assert.equal(res.code, 405);
});
