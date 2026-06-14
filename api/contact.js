import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT = process.env.CONTACT_EMAIL || "florian.schupp@student.uni-siegen.de";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, company, message, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Pflichtfelder fehlen." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Ungültige E-Mail-Adresse." });
  }

  try {
    await resend.emails.send({
      from: "Ainzigartig Website <onboarding@resend.dev>",
      to: RECIPIENT,
      replyTo: email,
      subject: `Neue Anfrage von ${name}${company ? " (" + company + ")" : ""}`,
      text: `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || "–"}\nInteresse: ${service || "–"}\n\n${message}`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "E-Mail konnte nicht gesendet werden." });
  }
}
