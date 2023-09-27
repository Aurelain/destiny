import localforage from 'localforage';
import {setState} from '../store.js';
import {STORE_KEY} from '../../CONSTANTS.js';
import StoreSchema from '../../schemas/StoreSchema.js';
import healJson from '../../utils/healJson.js';

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
        healJson(stored, StoreSchema);
    } catch (e) {
        console.warn(e);
        return;
    }

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
