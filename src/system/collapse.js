import gsap from 'gsap';
import {getState} from '../state/store.js';
import {selectShowDone} from '../state/selectors.js';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const collapse = (event) => {
    if (selectShowDone(getState())) {
        // We're not collapsing when all items should be kept visible
        return;
    }
    const target = event.currentTarget || event.target.closest('[role="button"]');
    gsap.to(target, {
        opacity: 0,
        duration: 0.5,
    });
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default collapse;
