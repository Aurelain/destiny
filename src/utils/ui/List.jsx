import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const TRANSITION_DURATION = '300ms';
const SX = {
    overlay: {
        position: 'fixed',
        inset: 0,
        visibility: 'hidden',
        backgroundColor: 'rgba(0,0,0,0)',
        transitionProperty: 'background-color,visibility',
        transitionDuration: TRANSITION_DURATION,
    },
    overlayIsOpen: {
        visibility: 'visible',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '90%',
        maxWidth: 256,
        background: '#fff',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        transform: 'translateX(-100%)',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px',
        transitionProperty: 'transform',
        transitionDuration: TRANSITION_DURATION,
    },
    menuIsOpen: {
        transform: 'translateX(0)',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class SideMenu extends React.PureComponent {
    render() {
        const {isOpen} = this.props;
        return (
            <div css={[SX.overlay, isOpen && SX.overlayIsOpen]} onClick={this.onOverlayClick}>
                <div css={[SX.menu, isOpen && SX.menuIsOpen]} onClick={this.onMenuClick}>
                    foo
                </div>
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
    onOverlayClick = () => {
        this.props.onClose?.();
    };

    /**
     *
     */
    onMenuClick = (event) => {
        event.stopPropagation();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
SideMenu.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
            icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        }),
    ),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
};
export default SideMenu;
