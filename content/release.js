/**
 * Explicit release gates. Set these to true only after the corresponding
 * factual content has been supplied and reviewed; wording changes alone must
 * never make the release check pass.
 */
export const RELEASE_STATUS = {
  providerIdentityComplete: false,
  privacyNoticeComplete: false,
};

export const LEGAL_RELEASE_READY = Object.values(RELEASE_STATUS).every(Boolean);
