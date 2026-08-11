import { Resend } from 'resend';

const MAX = { name: 100, email: 254, company: 140, service: 100, message: 5000 };
const clean = (value, limit) => typeof value === 'string' ? value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, limit) : '';
const json = (res, status, payload) => { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store'); return res.status(status).json(payload); };

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Diese Methode wird nicht unterstützt.' }); }
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) return json(res, 503, { error: 'Das Kontaktformular ist noch nicht vollständig konfiguriert. Bitte nutzen Sie die Kontaktdaten im Impressum.' });
  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { return json(res, 400, { error: 'Ungültiges Request-Format.' }); } }
  const name=clean(body.name,MAX.name),email=clean(body.email,MAX.email),company=clean(body.company,MAX.company),service=clean(body.service,MAX.service),message=clean(body.message,MAX.message),website=clean(body.website,200);
  if (website) return json(res, 200, { ok: true }); // honeypot
  if (!name || !email || message.length < 10) return json(res, 400, { error: 'Bitte füllen Sie Name, E-Mail und eine Nachricht mit mindestens 10 Zeichen aus.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 400, { error: 'Bitte prüfen Sie die E-Mail-Adresse.' });
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: process.env.CONTACT_FROM || 'Ainzigartig Website <onboarding@resend.dev>', to: process.env.CONTACT_EMAIL, replyTo: email, subject: `Website-Anfrage: ${service || 'Allgemein'}`, text: `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || '–'}\nInteresse: ${service || '–'}\n\n${message}` });
    if (error) throw new Error('provider');
    return json(res, 200, { ok: true });
  } catch (error) { console.error('Contact provider error', error?.message); return json(res, 502, { error: 'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später erneut.' }); }
}
