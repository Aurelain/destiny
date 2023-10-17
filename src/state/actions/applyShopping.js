import {setState} from '../store.js';
import stringifyShopping from '../../system/stringifyShopping.js';
import updateSummary from './updateSummary.js';
import createEvent from './createEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const applyShopping = async (shopping) => {
    const shoppingStructure = {
        title: shopping.title,
        items: shopping.items.filter((item) => item.isSelected),
    };
    const summary = stringifyShopping(shoppingStructure);
    if (shopping.eventId) {
        // The shopping event already exists
        updateSummary(shopping.calendarId, shopping.eventId, summary);
    } else {
        // Fresh shopping event
        createEvent(shopping.calendarId, summary);
    }
    setState((state) => {
        delete state.shopping;
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default applyShopping;
