import React from 'react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginLeft: 64,
        marginTop: 4,
    },
    title: {
        height: 24,
        lineHeight: '24px',
        borderRadius: 4,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        paddingLeft: 6,
        color: '#fff',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    render() {
        const {title, backgroundColor} = this.props;
        return (
            <div css={SX.root}>
                <div
                    css={SX.title}
                    style={{
                        backgroundColor,
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
};
export default Event;
