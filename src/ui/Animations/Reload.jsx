import React from 'react';
import {mdiReload} from '@mdi/js';
import Icon from '../Icon.jsx';
import {keyframes} from '@emotion/react';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
const SX = {
    root: {
        animationName: keyframes`
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
        `,
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        transformOrigin: '11px 12px',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Reload extends React.PureComponent {
    render() {
        return <Icon styling={SX.root} path={mdiReload} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Reload;
