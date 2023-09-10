import React from 'react';
import {mdiReload} from '@mdi/js';
import Icon from './Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Reload extends React.PureComponent {
    render() {
        return <Icon path={mdiReload} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Reload;
