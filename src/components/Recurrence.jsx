import React from 'react';
import PropTypes from 'prop-types';
import {BOX_SHADOW} from '../SETTINGS.js';

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
class Recurrence extends React.PureComponent {
    rootRef = React.createRef();
    render() {
        const {innerRef, styling} = this.props;
        const ref = innerRef || this.rootRef;
        return (
            <div css={[SX.root, styling]} ref={ref}>
                Recurrence
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
Recurrence.propTypes = {
    // -------------------------------- direct:
    recurrence: PropTypes.arrayOf(PropTypes.string),
    styling: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: rename to `css`
    innerRef: PropTypes.object,
    onRelease: PropTypes.func.isRequired,
};

export default Recurrence;
