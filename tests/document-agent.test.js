import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import liveAgentHandler from '../api/live-agent-demo.js';

function responseDouble() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

test('document sample UI wires visible controls to the sample API and result state', () => {
  const source = readFileSync(new URL('../components/LiveAgentDemo.tsx', import.meta.url), 'utf8');
  for (const label of ['Rechnung prüfen', 'E-Mail triagieren', 'Angebot analysieren']) assert.match(source, new RegExp(label));
  assert.match(source, /SAMPLES\.map\(\(sample\) =>/);
  assert.match(source, /onClick=\{\(\) => runSample\(sample\.text\)\}/);
  assert.match(source, /JSON\.stringify\(\{ mode: 'sample', text: sampleText \}\)/);
  assert.match(source, /setResult\(data\)/);
  assert.match(source, /role="status"/);
  assert.match(source, /role="alert"/);
});

test('document sample API accepts the UI payload and returns sanitized result data', async () => {
  const previous = {
    key: process.env.OPENAI_API_KEY,
    demos: process.env.AI_DEMOS_ENABLED,
    nodeEnv: process.env.NODE_ENV,
    kvUrl: process.env.KV_REST_API_URL,
    kvToken: process.env.KV_REST_API_TOKEN,
    fetch: globalThis.fetch,
  };
  process.env.OPENAI_API_KEY = 'test-only';
  process.env.AI_DEMOS_ENABLED = 'true';
  process.env.NODE_ENV = 'test';
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;

  let providerRequest;
  globalThis.fetch = async (_url, options) => {
    providerRequest = JSON.parse(options.body);
    return {
      ok: true,
      async json() {
        return {
          choices: [{ message: { content: JSON.stringify({
            document_type: 'Rechnung',
            document_type_icon: 'receipt_long',
            confidence: 'Hoch',
            key_fields: { Rechnungsnummer: 'RE-42' },
            suggested_actions: [{ title: 'Betrag prüfen', priority: 'Hoch', details: 'Mit Bestellung abgleichen.' }],
            risk_flags: [{ level: 'Info', message: 'Fiktives Beispieldokument.' }],
            summary: 'Eine fiktive Rechnung.',
            agent_reasoning: 'Der Dokumentkopf enthält eine Rechnungsnummer.',
          }) } }],
        };
      },
    };
  };

  try {
    const req = {
      method: 'POST',
      headers: {
        host: 'localhost:3000',
        'content-type': 'application/json',
        'user-agent': 'document-flow-test',
        'x-forwarded-for': '203.0.113.44',
      },
      body: { mode: 'sample', text: 'FIKTIVES BEISPIELDOKUMENT\nRECHNUNG Nr. RE-42' },
    };
    const res = responseDouble();
    await liveAgentHandler(req, res);

    assert.equal(res.statusCode, 200);
    assert.equal(res.payload.document_type, 'Rechnung');
    assert.equal(res.payload.key_fields.Rechnungsnummer, 'RE-42');
    assert.equal(providerRequest.messages[1].content.includes('RECHNUNG Nr. RE-42'), true);
  } finally {
    globalThis.fetch = previous.fetch;
    for (const [name, value] of [
      ['OPENAI_API_KEY', previous.key],
      ['AI_DEMOS_ENABLED', previous.demos],
      ['NODE_ENV', previous.nodeEnv],
      ['KV_REST_API_URL', previous.kvUrl],
      ['KV_REST_API_TOKEN', previous.kvToken],
    ]) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
});
