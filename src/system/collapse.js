import gsap from 'gsap';

// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const collapse = (event) => {
    const target = event.currentTarget || event.target.closest('[role="button"]');
    gsap.to(target, {
        height: 0,
        padding: 0,
        duration: 0.5,
    });
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default collapse;
