import React from 'react';
import {Fireworks as FireworksJs} from 'fireworks-js';
import sleep from '../utils/sleep.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
    },
};
const rootRef = React.createRef();
let isInitialized = false;
let fireworks;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Fireworks extends React.PureComponent {
    render() {
        return <div css={SX.root} ref={rootRef} />;
    }
}

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const burstAtMouse = async (event) => {
    initialize();
    fireworks.mouse.x = event.clientX;
    fireworks.mouse.y = event.clientY;
    fireworks.launch(5);
    await sleep(500);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const initialize = () => {
    if (isInitialized) {
        return;
    }
    fireworks = new FireworksJs(rootRef.current, {
        traceLength: 1,
        traceSpeed: 10000,
        // decay: {min: 0.02,max: 0.02},
        mouse: {
            move: true,
        },
    });
    isInitialized = true;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {burstAtMouse};
export default Fireworks;
