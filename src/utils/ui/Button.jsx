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
const HOLD_TIMEOUT = 500; // milliseconds
const HOLD_TOLERANCE = 10; // pixels
const CLICK_DELAY = 50; // milliseconds

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
    releaseTimeout;
    releaseParams;
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
                onClick={this.onRootClick}
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
        clearTimeout(this.releaseTimeout);
        this.releaseParams = null;
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
        window.addEventListener('pointerup', this.onWindowRelease);
        window.addEventListener('touchend', this.onWindowRelease);
        window.addEventListener('scroll', this.onWindowScrollWhilePressing);
        if (this.props.onHold) {
            this.initialX = event.clientX;
            this.initialY = event.clientY;
            this.holdTimeout = setTimeout(this.onHoldTimeout, HOLD_TIMEOUT);
            window.addEventListener('pointermove', this.onWindowMotion);
            window.addEventListener('touchmove', this.onWindowMotion);
        }
    };

    /**
     * Note: This handles both `pointermove` and `touchmove` because of the anomalies of `touch-action`.
     */
    onWindowMotion = (event) => {
        const {clientX, clientY} = getCoordinatesFromEvent(event);
        const deltaX = Math.abs(clientX - this.initialX);
        const deltaY = Math.abs(clientY - this.initialY);
        if (deltaX > HOLD_TOLERANCE || deltaY > HOLD_TOLERANCE) {
            this.cancelHolding();
        }
    };

    /**
     * Note: This handles both `pointerup` and `touchend` because of the anomalies of `touch-action`.
     * Note: We're using this event, instead of click, to avoid some confusing behavior on mobile (context menu firing,
     * scroll stealing the click etc.).
     */
    onWindowRelease = (event) => {
        const {isHolding} = this.state;
        this.cancelHolding();
        this.cancelPressing();

        const target = getTargetFromEvent(event);
        if (!checkParents(target, this.rootRef.current)) {
            // The user released the pointer somewhere outside the button, so no click
            return;
        }

        // We have to delay the announcement of the click a bit to avoid the secondary release event triggering another
        // click in other things (for example, maybe an overlay which appears after our click).
        // TODO: investigate if this delay would cause problems for audio activation
        this.releaseTimeout = setTimeout(this.onReleaseTimeout, CLICK_DELAY);
        this.releaseParams = {event, isHolding};
    };

    /**
     *
     */
    onReleaseTimeout = () => {
        const {onClick, onHold, name} = this.props;
        const {isHolding, event} = this.releaseParams;
        this.releaseParams = null;
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
        window.removeEventListener('pointermove', this.onWindowMotion);
        window.removeEventListener('touchmove', this.onWindowMotion);
    };

    /**
     *
     */
    cancelPressing = () => {
        this.setState({isPressing: false});
        window.removeEventListener('pointerup', this.onWindowRelease);
        window.removeEventListener('touchend', this.onWindowRelease);
        window.removeEventListener('scroll', this.onWindowScrollWhilePressing);
    };

    /**
     *
     */
    onRootContextMenu = (event) => {
        event.preventDefault();
    };

    /**
     *
     */
    onRootClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const getCoordinatesFromEvent = (event) => {
    event = event.changedTouches?.[0] || event;
    const {clientX, clientY} = event;
    return {clientX, clientY};
};

/**
 *
 */
const getTargetFromEvent = (event) => {
    const {clientX, clientY} = getCoordinatesFromEvent(event);
    return document.elementFromPoint(clientX, clientY);
};

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
