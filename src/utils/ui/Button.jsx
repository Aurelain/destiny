import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import checkParents from './checkParents.js';

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
        textAlign: 'center',
        lineHeight: 1.5,
        touchAction: 'none', // so dragging/scrolling doesn't mess with us
        cursor: 'pointer',
        padding: 2,
        transitionProperty: 'background-color,color',
        transitionDuration: '250ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        '& > *': {
            flexShrink: 0, // so the icons don't resize when the label is nowrap
        },
    },
    disabled: {
        pointerEvents: 'none',
        cursor: 'pointer',
        boxShadow: 'none',
        background: '#aaa',
    },
    allowTouch: {
        touchAction: 'unset',
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
        borderRadius: 4,
        color: '#fff',
        backgroundColor: '#1976d2',
        padding: '6px 16px',
        boxShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    contained_hover: {
        filter: 'brightness(1.20)',
    },
    contained_active: {
        filter: 'brightness(0.8)',
        boxShadow: 'none',
    },

    isHolding: {
        background: '#f00',
    },
};
const HOLD_TIMEOUT = 500;
const HOLD_TOLERANCE = 10;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Button extends React.PureComponent {
    state = {
        isHovering: false,
        isPressing: false,
        isHolding: false,
    };
    rootRef = React.createRef();
    holdTimeout;
    initialX;
    initialY;

    render() {
        const {label, icon, cssNormal, cssHover, cssActive, variant, disabled, allowTouch, ...otherProps} = this.props;
        delete otherProps.onHold;
        delete otherProps.onClick;
        const {isHovering, isPressing, isHolding} = this.state;

        return (
            <div
                {...otherProps}
                ref={this.rootRef}
                css={[
                    SX.root,

                    SX[variant + '_normal'],
                    cssNormal,

                    isHovering && SX[variant + '_hover'],
                    isHovering && cssHover,

                    isHovering && isPressing && SX[variant + '_active'],
                    isHovering && isPressing && cssActive,

                    disabled && SX.disabled,

                    allowTouch && SX.allowTouch,

                    isHolding && SX.isHolding,
                ]}
                onPointerEnter={this.onRootPointerEnter}
                onPointerLeave={this.onRootPointerLeave}
                onPointerDown={this.onRootPointerDown}
                onContextMenu={this.onRootContextMenu}
            >
                {this.memoIcon(icon)}
                {icon && label && ' '}
                {this.memoContent(label)}
            </div>
        );
    }

    componentWillUnmount() {
        this.cancelHolding();
        this.cancelPressing();
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
    onRootPointerEnter = () => {
        this.setState({isHovering: true});
    };

    /**
     *
     */
    onRootPointerLeave = () => {
        this.setState({isHovering: false});
    };

    /**
     *
     */
    onRootPointerDown = (event) => {
        this.setState({isPressing: true});
        window.addEventListener('pointerup', this.onWindowPointerUp);
        window.addEventListener('scroll', this.onWindowScrollWhilePressing);
        if (this.props.onHold) {
            this.initialX = event.clientX;
            this.initialY = event.clientY;
            this.holdTimeout = setTimeout(this.onHoldTimeout, HOLD_TIMEOUT);
            window.addEventListener('pointermove', this.onWindowPointerMove);
        }
    };

    /**
     *
     */
    onWindowPointerMove = (event) => {
        const deltaX = Math.abs(event.clientX - this.initialX);
        const deltaY = Math.abs(event.clientY - this.initialY);
        if (deltaX > HOLD_TOLERANCE || deltaY > HOLD_TOLERANCE) {
            this.cancelHolding();
        }
    };

    /**
     * Note: We're using this event, instead of click, to avoid some confusing behavior on mobile (context menu firing,
     * scroll stealing the click etc.).
     */
    onWindowPointerUp = (event) => {
        const {isHolding} = this.state;
        this.cancelHolding();
        this.cancelPressing();

        if (!checkParents(event.target, this.rootRef.current)) {
            // The user released the pointer somewhere outside the button, so no click
            return;
        }

        const {onClick, onHold, name} = this.props;
        if (isHolding) {
            onHold(event, name);
        } else {
            onClick?.(event, name);
        }
    };

    /**
     *
     */
    onHoldTimeout = () => {
        this.setState({
            isHolding: true,
        });
    };

    /**
     *
     */
    onWindowScrollWhilePressing = () => {
        this.setState({isHovering: false});
        this.cancelHolding();
        this.cancelPressing();
    };

    /**
     *
     */
    cancelHolding = () => {
        this.setState({isHolding: false});
        clearTimeout(this.holdTimeout);
        window.removeEventListener('pointermove', this.onWindowPointerMove);
    };

    /**
     *
     */
    cancelPressing = () => {
        this.setState({isPressing: false});
        window.removeEventListener('pointerup', this.onWindowPointerUp);
        window.removeEventListener('scroll', this.onWindowScrollWhilePressing);
    };

    /**
     *
     */
    onRootContextMenu = (event) => {
        event.preventDefault();
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
    disabled: PropTypes.bool,
    name: PropTypes.string,
    cssNormal: PropTypes.any,
    cssHover: PropTypes.any,
    cssActive: PropTypes.any,
    allowTouch: PropTypes.bool,
    onClick: PropTypes.func,
    onHold: PropTypes.func,
};
export default Button;
