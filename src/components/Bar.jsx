import React from 'react';
import Button from '../utils/ui/Button.jsx';
import Reload from '../icons/Reload.jsx';
import Menu from '../icons/Menu.jsx';
import SideMenu from '../utils/ui/SideMenu.jsx';
import Console from '../icons/Console.jsx';
import {VERSION} from '../COMMON.js';
import {BAR_HEIGHT} from '../system/CLIENT.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: BAR_HEIGHT,
        zIndex: 100,
        display: 'flex',
        background: '#528c1e',
        color: '#fff',
    },
    grow: {
        flexGrow: 1,
    },
    btn: {
        padding: 8,
    },
};

const MENU_ITEM_TOGGLE = 'MENU_ITEM_TOGGLE';
const MENU = [
    {
        name: MENU_ITEM_TOGGLE,
        icon: Console,
        label: 'Toggle Console',
    },
];

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Bar extends React.PureComponent {
    state = {
        isMenuOpen: false,
    };

    render() {
        const {isMenuOpen} = this.state;
        return (
            <div css={SX.root}>
                <Button label={Menu} cssNormal={SX.btn} onClick={this.onMenuClick} variant={'inverted'} />
                <div css={SX.grow} />
                <Button label={Reload} cssNormal={SX.btn} onClick={this.onReloadClick} variant={'inverted'} />
                <SideMenu
                    isOpen={isMenuOpen}
                    onClose={this.onMenuClose}
                    onClick={this.onMenuChoice}
                    title={'Destiny'}
                    subtitle={'v' + VERSION}
                    list={MENU}
                />
            </div>
        );
    }
    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onMenuClick = () => {
        this.setState({
            isMenuOpen: true,
        });
    };

    /**
     *
     */
    onMenuClose = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
        });
    };

    /**
     *
     */
    onMenuChoice = (event, name) => {
        switch (name) {
            case MENU_ITEM_TOGGLE:
                if (localStorage.getItem('console')) {
                    localStorage.removeItem('console');
                } else {
                    localStorage.setItem('console', 'emulated');
                }
                window.location.reload();
                break;
            default:
                assume(false, `Unexpected menu choice "${name}"!`);
        }
    };

    /**
     *
     */
    onReloadClick = () => {
        window.location.reload();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Bar;
