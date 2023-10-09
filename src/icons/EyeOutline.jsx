import React from 'react';
import {mdiEyeOutline} from '@mdi/js';
import Icon from './Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class EyeOutline extends React.PureComponent {
    render() {
        return <Icon path={mdiEyeOutline} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default EyeOutline;
