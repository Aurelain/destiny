export const selectAccessToken = (state) => state.tokens.accessToken;
export const selectRefreshToken = (state) => state.tokens.refreshToken;
export const selectExpirationTimestamp = (state) => state.tokens.expirationTimestamp;
export const selectCalendars = (state) => state.calendars;
export const selectEvents = (state) => state.events;
export const selectOptions = (state) => state.options;
export const selectHiddenCalendars = (state) => state.options.hiddenCalendars;
export const selectShowDone = (state) => state.options.showDone;
