import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_REASONS } from '../content/services.js';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website: string;
  privacyAccepted: boolean;
}

const INITIAL: ContactFormState = { name: '', email: '', company: '', service: '', message: '', website: '', privacyAccepted: false };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClass = 'w-full rounded-2xl border border-ink/15 bg-base/75 px-4 py-3.5 text-sm text-ink font-body placeholder:text-light/70 transition-colors focus:border-accent-hover focus:bg-surface focus:outline-none disabled:opacity-50';

export const ContactForm: React.FC = () => {
  const [data, setData] = useState<ContactFormState>(INITIAL);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [availability, setAvailability] = useState<'checking' | 'enabled' | 'disabled'>('checking');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/contact')
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((payload) => { if (!cancelled) setAvailability(payload?.configured ? 'enabled' : 'disabled'); })
      .catch(() => { if (!cancelled) setAvailability('disabled'); });
    return () => { cancelled = true; };
  }, []);

  const update = (field: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setData((d) => ({ ...d, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setErrorMsg('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    if (!EMAIL_REGEX.test(data.email)) {
      setErrorMsg('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (data.message.trim().length < 10) {
      setErrorMsg('Bitte beschreiben Sie Ihr Anliegen mit mindestens 10 Zeichen.');
      return;
    }
    if (!data.privacyAccepted) {
      setErrorMsg('Bitte bestätigen Sie den Datenschutzhinweis.');
      return;
    }

    setState('submitting');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt }),
      });
      const result = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setErrorMsg(result?.error || 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut.');
        setState('error');
        return;
      }
      setState('success');
    } catch {
      setErrorMsg('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="brand-card mt-8 bg-base/80 p-7 md:p-8 text-center">
        <span className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/25 border border-accent/50 flex items-center justify-center">
          <span className="material-symbols-outlined text-ink">check</span>
        </span>
        <p className="font-editorial text-2xl text-ink mb-2">Vielen Dank.</p>
        <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
          Wir haben Ihre Anfrage erhalten und melden uns mit einer ersten Einschätzung zurück.
        </p>
      </div>
    );
  }

  if (availability === 'checking') {
    return <div className="mt-8 rounded-2xl border border-ink/10 bg-base/60 p-5 text-sm text-muted" role="status">Kontaktstatus wird geprüft…</div>;
  }

  if (availability === 'disabled') {
    return (
      <div className="mt-8 rounded-2xl border border-ink/10 bg-base/60 p-5 md:p-6">
        <p className="font-editorial text-xl text-ink">Kontaktkanal derzeit nicht aktiviert.</p>
        <p className="text-sm text-muted leading-relaxed mt-2">Solange Anbieter- und Datenschutzangaben nicht vollständig hinterlegt sind, nimmt dieses Formular keine personenbezogenen Anfragen an. Es wird keine alternative Adresse erfunden.</p>
        <p className="text-xs uppercase tracking-[0.12em] text-light mt-5 mb-2">Vorgesehene Kontaktgründe</p>
        <ul className="space-y-1.5 text-xs text-muted">
          {CONTACT_REASONS.slice(0, 4).map((reason) => <li key={reason}>— {reason}</li>)}
        </ul>
      </div>
    );
  }

  const submitting = state === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
      <label className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={update('website')} />
      </label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Name *</span>
          <input id="cf-name" type="text" required maxLength={100} autoComplete="name" value={data.name} onChange={update('name')} disabled={submitting} className={fieldClass} />
        </label>
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">E-Mail *</span>
          <input id="cf-email" type="email" required maxLength={254} autoComplete="email" value={data.email} onChange={update('email')} disabled={submitting} className={fieldClass} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Unternehmen</span>
          <input id="cf-company" type="text" maxLength={140} autoComplete="organization" value={data.company} onChange={update('company')} disabled={submitting} className={fieldClass} />
        </label>
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Worum geht es?</span>
          <select id="cf-service" value={data.service} onChange={update('service')} disabled={submitting} className={fieldClass}>
            <option value="">Bitte wählen</option>
            {CONTACT_REASONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <label className="block text-xs font-semibold text-muted">
        <span className="block mb-2 ml-1">Nachricht *</span>
        <textarea
          id="cf-message"
          required
          rows={5}
          minLength={10}
          maxLength={3000}
          value={data.message}
          onChange={update('message')}
          disabled={submitting}
          placeholder="Was möchten Sie verbessern oder automatisieren?"
          className={`${fieldClass} resize-y`}
        />
      </label>

      <label className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-base/50 p-4 text-xs text-muted leading-relaxed">
        <input
          type="checkbox"
          checked={data.privacyAccepted}
          onChange={(event) => setData((current) => ({ ...current, privacyAccepted: event.target.checked }))}
          disabled={submitting}
          className="mt-0.5 h-4 w-4 accent-[#1A1918]"
        />
        <span>Ich habe die <Link to="/datenschutz" className="underline underline-offset-2 hover:text-ink">Datenschutzhinweise</Link> gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu. *</span>
      </label>

      {errorMsg && <p className="text-xs text-red-700 px-1" role="alert">{errorMsg}</p>}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={submitting} className="brand-pill bg-ink text-white hover:bg-[#33312E] disabled:opacity-50 disabled:cursor-not-allowed px-7 py-3.5 text-sm shrink-0">
          {submitting ? (
            <><span className="inline-block w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" /> Wird gesendet…</>
          ) : (
            <>Anfrage senden <span className="material-symbols-outlined text-[18px]">arrow_forward</span></>
          )}
        </button>
        <p className="text-xs text-light leading-relaxed">Unverbindlich. Wir sagen auch offen, wenn KI für den Fall keinen Sinn ergibt.</p>
      </div>
    </form>
  );
};

export default ContactForm;
