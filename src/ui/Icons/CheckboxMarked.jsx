import React from 'react';
import {mdiCheckboxMarked} from '@mdi/js';
import Icon from '../Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class CheckboxMarked extends React.PureComponent {
    render() {
        return <Icon path={mdiCheckboxMarked} {...this.props} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default CheckboxMarked;
