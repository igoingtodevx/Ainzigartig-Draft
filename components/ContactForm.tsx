import React, { useState } from 'react';
import { CheckIcon, ArrowRightIcon } from './Icons';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const INITIAL: ContactFormState = { name: '', email: '', company: '', service: '', message: '' };

const SERVICE_OPTIONS = [
  'Automatisierung & Integrationen',
  'KI-Beratung',
  'KI-Kundenservice',
  'KI-Website-Analyse',
  'Dokument-Agent / Automatisierung',
  'KI-Recruiting',
  'Analytics',
  'KI-Audit',
  'KI-Schnellstart',
  'Sonstiges',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fieldClass = 'w-full rounded-2xl border border-ink/15 bg-base/75 px-4 py-3.5 text-sm text-ink font-body placeholder:text-light/70 transition-colors focus:border-accent-hover focus:bg-surface focus:outline-none disabled:opacity-50';

export const ContactForm: React.FC = () => {
  const [data, setData] = useState<ContactFormState>(INITIAL);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (field: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setData((d) => ({ ...d, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'submitting') return; // no duplicate sends on double Enter
    setErrorMsg(null);

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      setErrorMsg('Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    if (!EMAIL_REGEX.test(data.email)) {
      setErrorMsg('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    setState('submitting');
    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
          <CheckIcon className="w-6 h-6 text-ink" />
        </span>
        <p className="font-editorial text-2xl text-ink mb-2">Vielen Dank.</p>
        <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
          Wir haben Ihre Anfrage erhalten und melden uns mit einer ersten Einschätzung zurück.
        </p>
      </div>
    );
  }

  const submitting = state === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Name *</span>
          <input id="cf-name" type="text" required autoComplete="name" value={data.name} onChange={update('name')} disabled={submitting} className={fieldClass} />
        </label>
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">E-Mail *</span>
          <input id="cf-email" type="email" required autoComplete="email" value={data.email} onChange={update('email')} disabled={submitting} className={fieldClass} />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Unternehmen</span>
          <input id="cf-company" type="text" autoComplete="organization" value={data.company} onChange={update('company')} disabled={submitting} className={fieldClass} />
        </label>
        <label className="block text-xs font-semibold text-muted">
          <span className="block mb-2 ml-1">Worum geht es?</span>
          <select id="cf-service" value={data.service} onChange={update('service')} disabled={submitting} className={fieldClass}>
            <option value="">Bitte wählen</option>
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <label className="block text-xs font-semibold text-muted">
        <span className="block mb-2 ml-1">Nachricht *</span>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={data.message}
          onChange={update('message')}
          disabled={submitting}
          placeholder="Was möchten Sie verbessern oder automatisieren?"
          className={`${fieldClass} resize-y`}
        />
      </label>

      {errorMsg && <p className="text-xs text-red-700 px-1" role="alert">{errorMsg}</p>}

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={submitting} className="brand-pill bg-ink text-white hover:bg-[#33312E] disabled:opacity-50 disabled:cursor-not-allowed px-7 py-3.5 text-sm shrink-0 flex items-center justify-center gap-2">
          {submitting ? (
            <><span className="inline-block w-3.5 h-3.5 border border-white border-t-transparent rounded-full animate-spin" /> Wird gesendet…</>
          ) : (
            <><span>Anfrage senden</span> <ArrowRightIcon className="w-4 h-4" /></>
          )}
        </button>
        <p className="text-xs text-light leading-relaxed">Unverbindlich. Wir sagen auch offen, wenn KI für den Fall keinen Sinn ergibt.</p>
      </div>
    </form>
  );
};

export default ContactForm;
