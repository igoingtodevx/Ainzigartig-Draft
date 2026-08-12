import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import contactHandler from '../api/contact.js';
import projectsHandler from '../api/projects.js';
import { LEGAL_RELEASE_READY } from '../content/release.js';
import { BUILT_SYSTEMS, LIVE_DEMOS } from '../content/proof.js';
import { CONTACT_REASONS, SERVICE_PILLARS } from '../content/services.js';

const EXPECTED_SERVICES = [
  'Automatisierung & Integrationen',
  'Dashboards & interne Business-Tools',
  'KI-Assistenten & Wissenssysteme',
  'Individuelle KI- & Softwarelösungen',
];

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

test('shared content exposes exactly the four agreed services', () => {
  assert.deepEqual(SERVICE_PILLARS.map((service) => service.title), EXPECTED_SERVICES);
  assert.deepEqual(CONTACT_REASONS.slice(0, 4), EXPECTED_SERVICES);
});

test('every service pillar targets a detail route rendering the same service id', () => {
  const expected = [
    ['/ki-beratung', 'automatisierung-integrationen', 'components/KIBeratung.tsx'],
    ['/analytics-dashboard', 'dashboards-business-tools', 'components/AnalyticsDashboard.tsx'],
    ['/ki-kundenservice', 'ki-assistenten-wissenssysteme', 'components/KIKundenservice.tsx'],
    ['/individuelle-ki-softwareloesungen', 'individuelle-ki-softwareloesungen', 'components/IndividualSolutions.tsx'],
  ];
  assert.deepEqual(SERVICE_PILLARS.map(({ to, id }) => [to, id]), expected.map(([to, id]) => [to, id]));
  const app = readFileSync(new URL('../App.tsx', import.meta.url), 'utf8');
  for (const [route, id, componentPath] of expected) {
    const component = readFileSync(new URL(`../${componentPath}`, import.meta.url), 'utf8');
    assert.match(component, new RegExp(`serviceId=["']${id}["']`));
    assert.match(app, new RegExp(`path=["']${route}["']`));
  }
});

test('proof levels contain the required demos and built systems', () => {
  assert.deepEqual(LIVE_DEMOS.map((item) => item.title), [
    'KI-Website-Analyse',
    'Dokument-Agent / Live Agent',
    'KI-Reifegrad-Check',
  ]);
  assert.deepEqual(BUILT_SYSTEMS.map((item) => item.title), [
    'AutoWunsch',
    'Zeitstempel',
    'Unternehmens-Wissensassistent',
  ]);
  assert.match(BUILT_SYSTEMS[0].boundary, /Nicht als automatische Marktplatz-Suche/);
  assert.match(BUILT_SYSTEMS[2].boundary, /Keine Zuordnung zu einem ungenannten Kunden/);
});

test('projects endpoint is stable repository-owned proof data', () => {
  const res = responseDouble();
  projectsHandler({ method: 'GET' }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.counts.live_demos, 3);
  assert.equal(res.payload.counts.built_systems, 3);
});

test('contact health stays disabled while the explicit legal gate is open', async () => {
  assert.equal(LEGAL_RELEASE_READY, false);
  const res = responseDouble();
  await contactHandler({ method: 'GET', headers: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.configured, false);
});
