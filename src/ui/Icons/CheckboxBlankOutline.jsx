import React from 'react';
import {mdiCheckboxBlankOutline} from '@mdi/js';
import Icon from '../Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class CheckboxBlankOutline extends React.PureComponent {
    render() {
        return <Icon path={mdiCheckboxBlankOutline} {...this.props} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default CheckboxBlankOutline;
