import sanitizeSummary from './sanitizeSummary.js';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const parseShopping = (summary) => {
    summary = sanitizeSummary(summary);
    const head = summary.match(/^\S+:/)[0];
    const title = head.substring(0, head.length - 1);

    const body = summary.substring(head.length);
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
