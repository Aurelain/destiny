import React from 'react';
import {mdiWrenchClock} from '@mdi/js';
import Icon from './Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class WrenchClock extends React.PureComponent {
    render() {
        return <Icon path={mdiWrenchClock} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default WrenchClock;
