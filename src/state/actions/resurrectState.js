import localforage from 'localforage';
import {setState} from '../store.js';
import {STORE_KEY} from '../../SETTINGS.js';
import healJson from '../../utils/healJson.js';
import STATE_SCHEMA from '../STATE_SCHEMA.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const resurrectState = async () => {
    const stored = await localforage.getItem(STORE_KEY);
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
