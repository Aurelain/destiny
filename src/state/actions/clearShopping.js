import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const clearShopping = () => {
    setState((state) => {
        delete state.shopping;
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default clearShopping;
