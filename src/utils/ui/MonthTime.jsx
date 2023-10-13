import React from 'react';
import PropTypes from 'prop-types';
import {BOX_SHADOW} from '../../SETTINGS.js';
import Month from './Month/Month.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 16,
        background: '#fff',
        borderRadius: 4,
        boxShadow: BOX_SHADOW,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class MonthTime extends React.PureComponent {
    rootRef = React.createRef();
    render() {
        const {date, innerRef, styling, onRelease} = this.props;
        const ref = innerRef || this.rootRef;
        return (
            <div css={[SX.root, styling]} ref={ref}>
                <Month date={date} onChange={onRelease} />
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
MonthTime.propTypes = {
    // -------------------------------- direct:
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
    styling: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: rename to `css`
    innerRef: PropTypes.object,
    onRelease: PropTypes.func.isRequired,
};

export default MonthTime;
