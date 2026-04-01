import sanitizeSummary from './sanitizeSummary.js';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const parseShopping = (summary) => {
    const colonIndex = summary.indexOf(':');
    const title = summary.substring(0, colonIndex + 1).trim();
    const body = summary.substring(colonIndex + 1);
    const parts = body.split(',');
    const items = [];
    for (const part of parts) {
        let text = sanitizeSummary(part);
        let isDone = false;
        if (text.startsWith('-')) {
            text = text.replace(/^-+/, '');
            isDone = true;
        }
        items.push({text, isDone});
    }
    return {title, items};
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default parseShopping;
