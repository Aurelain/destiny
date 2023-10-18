import {selectShoppingSuggestions} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleShoppingSuggestion = async (index) => {
    setState((state) => {
        const shoppingSuggestions = selectShoppingSuggestions(state);
        shoppingSuggestions.items[index].isSelected = !shoppingSuggestions.items[index].isSelected;
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleShoppingSuggestion;
