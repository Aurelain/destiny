import React from 'react';
import {mdiCircleSmall} from '@mdi/js';
import Icon from '../Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class CircleSmall extends React.PureComponent {
    render() {
        return <Icon path={mdiCircleSmall} {...this.props} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default CircleSmall;
