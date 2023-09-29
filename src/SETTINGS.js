export const USE_MOCK = Boolean(window.location.href.match(/\d/));
// export const USE_MOCK = true;

export const STORE_KEY = 'destiny-store'; // the name in IndexedDB
export const MILLISECONDS_IN_A_DAY = 1000 * 3600 * 24;
export const BAR_HEIGHT = 60;
export const NEW_HEIGHT = 48;
export const PRIMARY_COLOR = '#528c1e';

// The following values have been obtained through `btoa('actual_value')`. Funny security, right?
// prettier-ignore
// eslint-disable-next-line max-len
export const GOOGLE_CLIENT_ID = atob('NjQ2ODk2ODY2NjY2LWdsb2ZvbnVjOTZoaTY5Z3I0N3FhczY3MnFncGI2bnA4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t');
export const GOOGLE_CLIENT_SECRET = atob('R09DU1BYLW9tVW5nMjVNbnZxVkxia19OWS1BaHpCSlFzTzI=');
