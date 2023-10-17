import {selectShopping} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleShoppingSelection = async (index) => {
    setState((state) => {
        const shopping = selectShopping(state);
        shopping.items[index].isSelected = !shopping.items[index].isSelected;
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleShoppingSelection;
