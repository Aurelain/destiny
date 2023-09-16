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
        transitionProperty: 'background-color,color',
        transitionDuration: '250ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Variant `simple`:
    simple_normal: {
        // no special styles
    },
    simple_hover: {
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        color: '#1976d2',
    },
    simple_active: {
        backgroundColor: 'rgba(25, 118, 210, 0.14)',
    },

    // Variant `inverted`:
    inverted_normal: {
        color: '#fff',
    },
    inverted_hover: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        color: 'yellow',
    },
    inverted_active: {
        backgroundColor: 'rgba(0, 0, 0, 0.14)',
    },

    // Variant `contained`:
    contained_normal: {
        borderRadius: 6,
        color: '#fff',
        backgroundColor: '#1976d2',
    },
    contained_hover: {
        backgroundColor: '#1565c0',
    },
    contained_active: {
        backgroundColor: '#6093D0',
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
        const {label, icon, cssNormal, onClick, cssHover, cssActive, variant} = this.props;
        const {isHovering, isPressing} = this.state;

        return (
            <div
                css={[
                    SX.root,

                    SX[variant + '_normal'],
                    cssNormal,

                    isHovering && SX[variant + '_hover'],
                    isHovering && cssHover,

                    isHovering && isPressing && SX[variant + '_active'],
                    isHovering && isPressing && cssActive,
                ]}
                onPointerEnter={this.onPointerEnter}
                onPointerLeave={this.onPointerLeave}
                onPointerDown={this.onPointerDown}
                onClick={onClick}
            >
                {this.memoIcon(icon)}
                {icon && label && ' '}
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
    memoIcon = memoize((icon) => {
        if (typeof icon === 'function') {
            const Icon = icon;
            return <Icon />;
        } else {
            return icon;
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
Button.defaultProps = {
    variant: 'contained',
};
Button.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    variant: PropTypes.oneOf(['simple', 'inverted', 'contained']),
    onClick: PropTypes.func,
    cssNormal: PropTypes.any,
    cssHover: PropTypes.any,
    cssActive: PropTypes.any,
};
export default Button;
