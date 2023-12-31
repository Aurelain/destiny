import React from 'react';
import {mdiCircleOutline} from '@mdi/js';
import Icon from '../Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class CircleOutline extends React.PureComponent {
    render() {
        return <Icon path={mdiCircleOutline} {...this.props} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default CircleOutline;
