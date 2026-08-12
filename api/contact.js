import { Resend } from 'resend';
import { LEGAL_RELEASE_READY } from '../content/release.js';
import { CONTACT_REASONS } from '../content/services.js';
import { enforcePublicPost, handleOptions, readJsonBody } from '../server/apiGuard.js';

const MAX_BODY_BYTES = 8_000;
const MAX = { name: 100, email: 254, company: 140, service: 100, message: 3000, nextStep: 300 };
const cleanInline = (value, limit) => typeof value === 'string'
  ? value.trim().replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').slice(0, limit)
  : '';
const cleanMessage = (value, limit) => typeof value === 'string'
  ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, limit)
  : '';
const json = (res, status, payload) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(payload);
};

export default async function handler(req, res) {
  if (handleOptions(req, res, ['GET', 'POST'])) return;
  if (req.method === 'GET') {
    const configured = LEGAL_RELEASE_READY && process.env.CONTACT_FORM_ENABLED === 'true' && !!process.env.RESEND_API_KEY && !!process.env.CONTACT_EMAIL && !!process.env.CONTACT_FROM;
    return json(res, 200, { status: 'ok', configured });
  }
  if (!await enforcePublicPost(req, res, {
    namespace: 'contact',
    limit: 5,
    windowMs: 60 * 60 * 1000,
    minIntervalMs: 20_000,
    maxBodyBytes: MAX_BODY_BYTES,
  })) return;

  if (!LEGAL_RELEASE_READY || process.env.CONTACT_FORM_ENABLED !== 'true') {
    return json(res, 503, { error: 'Der Kontaktkanal ist derzeit nicht aktiviert.' });
  }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL || !process.env.CONTACT_FROM) {
    return json(res, 503, { error: 'Der Kontaktkanal ist noch nicht vollständig konfiguriert.' });
  }

  let body;
  try {
    body = await readJsonBody(req, MAX_BODY_BYTES);
  } catch (error) {
    return json(res, error?.code === 'PAYLOAD_TOO_LARGE' ? 413 : 400, { error: 'Ungültiges Request-Format.' });
  }

  const name = cleanInline(body.name, MAX.name);
  const email = cleanInline(body.email, MAX.email).toLowerCase();
  const company = cleanInline(body.company, MAX.company);
  const service = cleanInline(body.service, MAX.service);
  const message = cleanMessage(body.message, MAX.message);
  const nextStep = cleanInline(body.nextStep, MAX.nextStep);
  const website = cleanInline(body.website, 200);
  const startedAt = Number(body.startedAt);

  // Silent success keeps basic bots from learning which trap fired.
  if (website || !Number.isFinite(startedAt) || Date.now() - startedAt < 3_000 || Date.now() - startedAt > 2 * 60 * 60 * 1000) {
    return json(res, 200, { ok: true });
  }
  if (!name || !email || message.length < 10) {
    return json(res, 400, { error: 'Bitte füllen Sie Name, E-Mail und eine Nachricht mit mindestens 10 Zeichen aus.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(res, 400, { error: 'Bitte prüfen Sie die E-Mail-Adresse.' });
  }
  if (body.privacyAccepted !== true) {
    return json(res, 400, { error: 'Bitte bestätigen Sie den Datenschutzhinweis.' });
  }
  if (service && !CONTACT_REASONS.includes(service)) {
    return json(res, 400, { error: 'Bitte wählen Sie einen gültigen Kontaktgrund.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Website-Anfrage: ${service || 'Allgemein'}`,
      text: `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || '–'}\nInteresse: ${service || '–'}\nGewünschter nächster Schritt: ${nextStep || '–'}\n\n${message}`,
    });
    if (error) throw new Error('provider');
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact provider error', error?.message);
    return json(res, 502, { error: 'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.' });
  }
}
