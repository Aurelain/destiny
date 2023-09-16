import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

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
        touchAction: 'none', // so dragging/scrolling doesn't mess with us
        cursor: 'pointer',
        padding: 2,
    },
    hover: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    active: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Button extends React.PureComponent {
    state = {
        isHovering: false,
        isPressing: false,
    };

    render() {
        const {label, cssNormal, onClick, cssHover, cssActive} = this.props;
        const {isHovering, isPressing} = this.state;

        return (
            <div
                css={[
                    SX.root,
                    cssNormal,
                    isHovering && (cssHover || SX.hover), // hover
                    isHovering && isPressing && (cssActive || SX.active), // active
                ]}
                onPointerEnter={this.onPointerEnter}
                onPointerLeave={this.onPointerLeave}
                onPointerDown={this.onPointerDown}
                onClick={onClick}
            >
                {this.memoContent(label)}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoContent = memoize((label) => {
        if (typeof label === 'function') {
            const Icon = label;
            return <Icon />;
        } else {
            return label;
        }
    });

    /**
     *
     */
    onPointerEnter = () => {
        this.setState({isHovering: true});
    };

    /**
     *
     */
    onPointerLeave = () => {
        this.setState({isHovering: false});
    };

    /**
     *
     */
    onPointerDown = () => {
        this.setState({isPressing: true});
        window.addEventListener('pointerup', this.onWindowPointerUp);
    };

    /**
     *
     */
    onWindowPointerUp = () => {
        this.setState({isPressing: false});
        window.removeEventListener('pointerup', this.onWindowPointerUp);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Button.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
    onClick: PropTypes.func,
    cssNormal: PropTypes.any,
    cssHover: PropTypes.any,
    cssActive: PropTypes.any,
};
export default Button;
