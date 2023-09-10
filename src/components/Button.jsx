import React from 'react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        minWidth: 24,
        minHeight: 24,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hover: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Button extends React.PureComponent {
    state = {
        isHover: false,
        isPress: false,
    };
    render() {
        const {children, css, onClick} = this.props;
        return (
            <div
                css={[SX.root, css]}
                onPointerEnter={this.onPointerEnter}
                onPointerLeave={this.onPointerLeave}
                onPointerDown={this.onPointerDown}
                onClick={onClick}
            >
                {children}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onPointerEnter = () => {
        console.log('onPointerEnter');
    };

    /**
     *
     */
    onPointerLeave = () => {
        console.log('onPointerLeave');
    };

    /**
     *
     */
    onPointerDown = () => {
        console.log('onPointerDown');
        window.addEventListener('pointerup', this.onWindowPointerUp);
        // window.addEventListener('pointermove', this.onWindowPointerMove);
    };

    /**
     *
     */
    onWindowPointerMove = () => {
        console.log('onWindowPointerMove');
    };

    /**
     *
     */
    onWindowPointerUp = () => {
        console.log('onWindowPointerUp');
        window.removeEventListener('pointerup', this.onWindowPointerUp);
        // window.removeEventListener('pointermove', this.onWindowPointerMove);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    css: PropTypes.any,
};
export default Button;
