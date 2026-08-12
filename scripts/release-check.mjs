import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { RELEASE_STATUS } from '../content/release.js';

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const errors = [];

const imprint = read('components/Impressum.tsx');
const privacy = read('components/Datenschutz.tsx');
const vite = read('vite.config.ts');
const gitignore = read('.gitignore');

if (!RELEASE_STATUS.providerIdentityComplete || imprint.includes('Anbieterangaben fehlen')) {
  errors.push('Anbieterangaben sind nicht vollständig hinterlegt.');
}
if (!RELEASE_STATUS.privacyNoticeComplete || privacy.includes('keine vollständige Datenschutzerklärung')) {
  errors.push('Die Datenschutzerklärung ist noch nicht vollständig.');
}
if (/process\.env\.(API_KEY|GEMINI_API_KEY)|define\s*:\s*\{[^}]*API_KEY/s.test(vite)) {
  errors.push('Vite enthält eine mögliche Client-Injektion für einen API-Schlüssel.');
}
if (!gitignore.includes('.env.*') || !gitignore.includes('!.env.example')) {
  errors.push('Die .env-Ignore-Regeln sind nicht vollständig.');
}

if (Boolean(process.env.SCRAPER_URL) !== Boolean(process.env.SCRAPER_TOKEN)) {
  errors.push('SCRAPER_URL und SCRAPER_TOKEN müssen gemeinsam gesetzt werden.');
}

if (process.env.CONTACT_FORM_ENABLED === 'true') {
  if (!Object.values(RELEASE_STATUS).every(Boolean)) {
    errors.push('Das Kontaktformular darf vor Abschluss der Legal-Gates nicht aktiviert werden.');
  }
  for (const name of ['RESEND_API_KEY', 'CONTACT_EMAIL', 'CONTACT_FROM']) {
    if (!process.env[name]) errors.push(`${name} fehlt trotz aktiviertem Kontaktformular.`);
  }
}

if (errors.length) {
  console.error('Release-Check blockiert:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Release-Check bestanden.');
