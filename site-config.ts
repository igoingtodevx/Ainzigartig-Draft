export type PublicationMode = 'preview' | 'production';

const env = import.meta.env;

export const siteConfig = {
  mode: env.VITE_SITE_MODE === 'production' ? ('production' as PublicationMode) : ('preview' as PublicationMode),
  brandName: 'Ainzigartig',
  legal: {
    providerName: env.VITE_LEGAL_PROVIDER_NAME?.trim() || '',
    address: env.VITE_LEGAL_ADDRESS?.trim() || '',
    email: env.VITE_LEGAL_EMAIL?.trim() || '',
    contentResponsible: env.VITE_LEGAL_CONTENT_RESPONSIBLE?.trim() || '',
  },
};

export const legalDetailsComplete = Object.values(siteConfig.legal).every(Boolean);
export const isPublicationReady = siteConfig.mode === 'production' && legalDetailsComplete;
export const documentUploadsEnabled = isPublicationReady && env.VITE_DOCUMENT_UPLOADS_ENABLED === 'true';
export const externalWebsiteAuditsEnabled = isPublicationReady && env.VITE_EXTERNAL_AUDIT_ENABLED === 'true';

export const publicationMessage =
  'Diese Vorschau ist noch nicht als öffentliches Angebot freigegeben. Betreiber-, Kontakt- und Datenschutzhinweise werden erst nach verbindlicher Klärung veröffentlicht.';
