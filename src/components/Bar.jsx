import React from 'react';
import Button from '../utils/ui/Button.jsx';
import Reload from '../icons/Reload.jsx';
import Menu from '../icons/Menu.jsx';
import SideMenu from '../utils/ui/SideMenu.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        display: 'flex',
        color: '#fff',
        background: '#528c1e',
        height: 60,
    },
    grow: {
        flexGrow: 1,
    },
    btn: {
        padding: 8,
    },
};

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
                <SideMenu isOpen={isMenuOpen} onClose={this.onMenuClose} />
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
    onReloadClick = () => {
        window.location.reload();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Bar;
