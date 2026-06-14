import React, { useState } from 'react';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const INITIAL: ContactFormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
};

const SERVICE_OPTIONS = [
  'KI-Beratung',
  'KI-Kundenservice',
  'KI-Recruiting',
  'Analytics',
  'KI-Audit',
  'KI-Schnellstart',
  'Sonstiges',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm: React.FC = () => {
  const [data, setData] = useState<ContactFormState>(INITIAL);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const update = (field: keyof ContactFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setData((d) => ({ ...d, [field]: e.target.value }));
  };

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
    } catch (err) {
      setErrorMsg('Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="mt-10 border border-accent/30 bg-accent/[0.04] p-8 text-center max-w-xl">
        <span className="material-symbols-outlined text-accent text-4xl mb-3 block">check_circle</span>
        <p className="font-editorial text-xl text-ink mb-2">Vielen Dank.</p>
        <p className="text-sm text-muted leading-relaxed">
          Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden
          mit einer ehrlichen Einschätzung — keine Folgetermine, kein Pitch.
        </p>
      </div>
    );
  }

  const submitting = state === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-name" className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            value={data.name}
            onChange={update('name')}
            disabled={submitting}
            className="w-full bg-transparent border-b border-faint focus:border-accent focus:outline-none py-2 text-sm text-ink font-body transition-colors duration-200 disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
            E-Mail <span className="text-accent">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={data.email}
            onChange={update('email')}
            disabled={submitting}
            className="w-full bg-transparent border-b border-faint focus:border-accent focus:outline-none py-2 text-sm text-ink font-body transition-colors duration-200 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-company" className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
            Unternehmen
          </label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            value={data.company}
            onChange={update('company')}
            disabled={submitting}
            className="w-full bg-transparent border-b border-faint focus:border-accent focus:outline-none py-2 text-sm text-ink font-body transition-colors duration-200 disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="cf-service" className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
            Interesse
          </label>
          <select
            id="cf-service"
            value={data.service}
            onChange={update('service')}
            disabled={submitting}
            className="w-full bg-transparent border-b border-faint focus:border-accent focus:outline-none py-2 text-sm text-ink font-body transition-colors duration-200 disabled:opacity-50"
          >
            <option value="">Bitte wählen</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-xs text-muted font-body uppercase tracking-[0.15em] mb-2">
          Nachricht <span className="text-accent">*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={data.message}
          onChange={update('message')}
          disabled={submitting}
          className="w-full bg-transparent border border-faint/60 focus:border-accent focus:outline-none p-3 text-sm text-ink font-body transition-colors duration-200 resize-y disabled:opacity-50"
        />
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-body" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <>
              <span className="inline-block w-3 h-3 border border-base border-t-transparent rounded-full animate-spin" />
              Wird gesendet…
            </>
          ) : (
            <>
              Anfrage senden
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>
        <p className="text-xs text-faint font-body">
          Antwort innerhalb von 24 Stunden. Keine Folgetermine, kein Pitch.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
