import localforage from 'localforage';
import {setState} from '../store.js';
import {STORE_KEY, USE_MOCK} from '../../SETTINGS.js';
import healJson from '../../utils/healJson.js';
import STATE_SCHEMA from '../STATE_SCHEMA.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const MOCK = {
    tokens: {
        accessToken: 'foo',
        refreshToken: 'foo',
        expirationTimestamp: 0,
    },
    user: {
        email: '',
    },
    calendars: [
        {
            id: 'foo@gmail.com',
            summary: 'Foo',
            backgroundColor: '#0b8043',
        },
    ],
    events: [
        {
            id: 'urm29vfme6ebe49npr1hrn5kdg',
            calendarId: 'foo@gmail.com',
            summary: 'MyEvent',
            start: '2023-09-28',
            end: '2023-09-29',
        },
    ],
    options: {
        hiddenCalendars: {},
    },
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const resurrectState = async () => {
    const stored = USE_MOCK ? MOCK : await localforage.getItem(STORE_KEY);
    if (!stored) {
        return;
    }

    try {
        healJson(stored, STATE_SCHEMA);
    } catch (e) {
        console.warn(e);
        return;
    }
    // delete stored.tokens;

    setState((state) => {
        for (const key in stored) {
            state[key] = stored[key];
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default resurrectState;
