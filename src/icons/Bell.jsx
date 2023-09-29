import React from 'react';
import {mdiBell} from '@mdi/js';
import Icon from './Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Bell extends React.PureComponent {
    render() {
        return <Icon path={mdiBell} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Bell;
