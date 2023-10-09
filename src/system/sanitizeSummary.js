// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const sanitizeSummary = (summary) => {
    summary = summary.replace(/<.*?>/g, ' ');
    summary = summary.replace(/&\w+;/g, ' ');
    summary = summary.replace(/\s+/g, ' ');
    summary = summary.trim();
    summary = summary.replace(/[^\s-]/, (c) => c.toUpperCase());
    return summary;
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default sanitizeSummary;
