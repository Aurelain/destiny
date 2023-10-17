import {setState} from '../store.js';
import checkShopping from '../../system/checkShopping.js';
import parseShopping from '../../system/parseShopping.js';
import searchEvents from '../../system/searchEvents.js';
import checkEventIsDone from '../../system/checkEventIsDone.js';
import createEvent from './createEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const populateShopping = async (fallbackCalendarId, summary) => {
    const shopping = parseShopping(summary);
    const {title, items} = shopping;
    const similarEvents = await searchEvents(title + ':', true); // smart searching only a calendar, if possible

    const candidateItems = items.map((item) => ({
        text: item.text,
        isSelected: true, // any text that was mentioned while creating the event is selected by default
    }));

    for (const {summary, status} of similarEvents) {
        const isEventDone = checkEventIsDone(summary, status);
        const similarShopping = checkShopping(summary) && parseShopping(summary);
        if (similarShopping?.title === title) {
            for (const {text, isDone} of similarShopping.items) {
                candidateItems.push({
                    text,
                    isSelected: !isEventDone && !isDone,
                });
            }
        }
    }

    const shoppingItems = consolidateShoppingItems(candidateItems);
    if (!shoppingItems.length) {
        await createEvent(fallbackCalendarId, summary);
        return;
    }

    shoppingItems.sort(compareShoppingItems);

    const pendingEvent = similarEvents.find((event) => !checkEventIsDone(event.summary, event.status));
    const calendarId = pendingEvent?.calendarId || similarEvents[0]?.calendarId || fallbackCalendarId;

    setState((state) => {
        state.shopping = {
            calendarId,
            eventId: pendingEvent?.id || '',
            title,
            items: shoppingItems,
        };
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
export default populateShopping;
