# Owner input required before public launch

The site deliberately stays in `VITE_SITE_MODE=preview` until these facts are confirmed and configured. Do not invent any of them.

- Legal operator: exact name / legal form, ladungsfähige address, contact email, and the person responsible for editorial content.
- Commercial setup: whether the activity is operated as a sole proprietorship or jointly, plus the resulting tax and registration information where applicable.
- Email delivery: a verified sending domain and a monitored recipient mailbox (`CONTACT_FROM_EMAIL`, `CONTACT_EMAIL`).
- Data-processing decisions: hosting, Vercel Analytics, OpenAI, Resend, and any document-analysis provider must be reviewed and reflected in the final privacy notice.
- Consent and retention: decide whether contact inquiries and chat histories are stored, for how long, and who handles deletion requests.

After this is complete, set the `VITE_LEGAL_*` variables and `VITE_SITE_MODE=production` in the production environment, then have the final notice reviewed for the actual business setup.
