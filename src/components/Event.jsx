import React from 'react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginLeft: 64,
        borderRadius: 4,
        overflow: 'hidden',
        height: 24,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    render() {
        const {title, backgroundColor, foregroundColor} = this.props;
        return (
            <div css={SX.root}>
                <div
                    css={SX.title}
                    style={{
                        backgroundColor,
                        color: foregroundColor,
                    }}
                >
                    {title}
                </div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    componentDidMount() {}
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Event.propTypes = {
    hasDay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    foregroundColor: PropTypes.string.isRequired,
};
export default Event;
