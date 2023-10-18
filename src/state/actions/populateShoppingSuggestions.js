import {setState} from '../store.js';
import checkShopping from '../../system/checkShopping.js';
import parseShopping from '../../system/parseShopping.js';
import searchEvents from '../../system/searchEvents.js';
import checkEventIsDone from '../../system/checkEventIsDone.js';
import {selectShoppingSuggestions} from '../selectors.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const populateShoppingSuggestions = async (title) => {
    setState((state) => {
        state.shoppingSuggestions = {
            title,
            items: [],
        };
    });

    const similarEvents = await searchEvents(title + ':', true); // smart searching only one calendar, if possible

    const candidateItems = [];
    for (const {summary, status} of similarEvents) {
        const similarShopping = checkShopping(summary) && parseShopping(summary);
        if (similarShopping?.title === title) {
            const isEventDone = checkEventIsDone(summary, status);
            for (const {text, isDone} of similarShopping.items) {
                candidateItems.push({
                    text,
                    isSelected: !isEventDone && !isDone,
                });
            }
        }
    }

    const suggestedItems = consolidateShoppingItems(candidateItems);
    suggestedItems.sort(compareShoppingItems);
    setState((state) => {
        const shoppingSuggestions = selectShoppingSuggestions(state);
        if (shoppingSuggestions?.title === title) {
            shoppingSuggestions.items = suggestedItems;
        }
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const consolidateShoppingItems = (candidateItems) => {
    const output = [];
    const used = {};
    for (const item of candidateItems) {
        if (item.text && !used[item.text]) {
            used[item.text] = true;
            output.push(item);
        }
    }
    return output;
};

/**
 *
 */
const compareShoppingItems = (a, b) => {
    return a.text.localeCompare(b.text);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default populateShoppingSuggestions;
