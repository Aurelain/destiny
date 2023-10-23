import sanitizeSummary from './sanitizeSummary.js';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const parseShopping = (summary) => {
    const head = summary.match(/^[\s-]*\S+:/)[0];
    const title = head.replace(/[:\s-]/g, '');

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
