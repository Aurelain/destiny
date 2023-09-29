import React from 'react';
import {mdiTimelineCheckOutline} from '@mdi/js';
import Icon from './Icon.jsx';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class TimelineCheckOutline extends React.PureComponent {
    render() {
        return <Icon path={mdiTimelineCheckOutline} />;
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default TimelineCheckOutline;
