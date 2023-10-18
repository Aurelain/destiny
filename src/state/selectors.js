export const selectAccessToken = (state) => state.tokens.accessToken;
export const selectRefreshToken = (state) => state.tokens.refreshToken;
export const selectExpirationTimestamp = (state) => state.tokens.expirationTimestamp;
export const selectCalendars = (state) => state.calendars;
export const selectEvents = (state) => state.events;
export const selectOptions = (state) => state.options;
export const selectExpandedEvents = (state) => state.options.expandedEvents;
export const selectShowDone = (state) => state.options.showDone;
export const selectPreferredCalendar = (state) => state.options.preferredCalendar;
export const selectShoppingSuggestions = (state) => state.shoppingSuggestions;
