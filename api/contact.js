import { Resend } from "resend";

const RECIPIENT = process.env.CONTACT_EMAIL;
const FROM = process.env.CONTACT_FROM_EMAIL;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  if (!process.env.RESEND_API_KEY || !RECIPIENT || !FROM) {
    return res.status(503).json({ error: "Das Kontaktformular ist noch nicht für den Versand freigegeben." });
  }

  const { name, email, company, message, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Pflichtfelder fehlen." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `Neue Anfrage von ${name}${company ? " (" + company + ")" : ""}`,
      text: `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || "–"}\nInteresse: ${service || "–"}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error.message);
      return res.status(502).json({ error: "E-Mail konnte nicht zugestellt werden." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden." });
  }
}
