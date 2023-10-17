import sanitizeSummary from './sanitizeSummary.js';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const stringifyShopping = (shoppingStructure) => {
    const cleanItems = [];
    for (const item of shoppingStructure.items) {
        const {text, isDone} = item;
        let draft = '';
        if (isDone) {
            draft += '-';
        }
        draft += prepareTextForSaving(text);
        if (draft) {
            cleanItems.push(draft);
        }
    }
    let output = prepareTextForSaving(shoppingStructure.title) + ': ' + cleanItems.join(', ');
    output = output.replace(/[\s-,]*$/, '');
    return output;
};

// =================================================================================================================
//  P R I V A T E
// =================================================================================================================
/**
 *
 */
const prepareTextForSaving = (text) => {
    text = sanitizeSummary(text);
    text = text.replace(/<.*?>/g, '');
    return text;
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default stringifyShopping;
