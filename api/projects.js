// Stable, repository-owned proof data. Public project evidence must not depend
// on GitHub authentication or a mutable repository listing at request time.
import { BUILT_SYSTEMS, LIVE_DEMOS } from '../content/proof.js';

function sendJson(res, status, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(status).json(data);
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Diese Methode wird nicht unterstützt.' });
  }

  return sendJson(res, 200, {
    live_demos: LIVE_DEMOS,
    built_systems: BUILT_SYSTEMS,
    counts: { live_demos: LIVE_DEMOS.length, built_systems: BUILT_SYSTEMS.length },
  });
}

export const config = { maxDuration: 5 };
