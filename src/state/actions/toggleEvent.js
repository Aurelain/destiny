import {selectExpandedEvents, selectOptions} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleEvent = (eventId, futureValue = undefined) => {
    setState((state) => {
        const expandedEvents = selectExpandedEvents(state);
        if (futureValue === undefined) {
            futureValue = !(eventId in expandedEvents);
        }
        if (futureValue) {
            const options = selectOptions(state);
            options.expandedEvents = {
                [eventId]: true,
            };
        } else {
            delete expandedEvents[eventId];
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleEvent;
