import {selectExpandedEvents, selectOptions} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleEvent = (eventId) => {
    setState((state) => {
        const expandedEvents = selectExpandedEvents(state);
        if (eventId in expandedEvents) {
            delete expandedEvents[eventId];
        } else {
            const options = selectOptions(state);
            options.expandedEvents = {
                [eventId]: true,
            };
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleEvent;
