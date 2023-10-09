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
    summary = summary.replace(/[^\s-]\w*/, capitalizeSummary);
    summary = summary.replace(/(http\S+)/gi, '<a href="$1" contentEditable="false" target="_blank">$1</a>');
    summary = summary.replace(/ ,/g, ',');
    return summary;
};

// =================================================================================================================
//  P R I V A T E
// =================================================================================================================
/**
 *
 */
const capitalizeSummary = (firstWord) => {
    if (firstWord.startsWith('http')) {
        return firstWord;
    }
    return firstWord.charAt(0).toUpperCase() + firstWord.substring(1);
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default sanitizeSummary;
