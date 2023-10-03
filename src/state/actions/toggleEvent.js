import {selectExpandedEvents, selectOptions} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleEvent = (eventId, value = undefined) => {
    setState((state) => {
        const expandedEvents = selectExpandedEvents(state);
        if (value === undefined) {
            if (eventId in expandedEvents) {
                delete expandedEvents[eventId];
            } else {
                const options = selectOptions(state);
                options.expandedEvents = {
                    [eventId]: true,
                };
            }
        } else {
            const options = selectOptions(state);
            options.expandedEvents = {
                [eventId]: value,
            };
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleEvent;
