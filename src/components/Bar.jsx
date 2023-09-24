import React from 'react';
import Button from '../utils/ui/Button.jsx';
import Reload from '../icons/Reload.jsx';
import Menu from '../icons/Menu.jsx';
import SideMenu from '../utils/ui/SideMenu.jsx';
import Console from '../icons/Console.jsx';
import {ENDPOINT_TOGGLE_CALENDAR, VERSION} from '../COMMON.js';
import {BAR_HEIGHT, PRIMARY_COLOR} from '../system/CLIENT.js';
import assume from '../utils/assume.js';
import Spin from '../icons/Spin.jsx';
import {addFetchListener, checkIsLoading, removeFetchListener} from '../utils/fetchWithLoading.js';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import CheckboxMarked from '../icons/CheckboxMarked.jsx';
import requestEndpoint from '../system/requestEndpoint.js';
import CheckboxBlankOutline from '../icons/CheckboxBlankOutline.jsx';

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
        background: PRIMARY_COLOR,
        color: '#fff',
    },
    grow: {
        flexGrow: 1,
    },
    btn: {
        padding: 8,
    },
};

const MENU_SHOW_CONSOLE = 'MENU_SHOW_CONSOLE';
const MENU = [
    {
        name: MENU_SHOW_CONSOLE,
        icon: Console,
        label: 'Show Console',
    },
];

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Bar extends React.PureComponent {
    state = {
        isMenuOpen: false,
        isLoading: false,
    };

    render() {
        const {store} = this.props;
        const {isMenuOpen, isLoading} = this.state;
        const reloadIcon = isLoading ? Spin : Reload;
        return (
            <div css={SX.root}>
                <Button label={Menu} cssNormal={SX.btn} onClick={this.onMenuClick} variant={'inverted'} />
                <div css={SX.grow} />
                <Button label={reloadIcon} cssNormal={SX.btn} onClick={this.onReloadClick} variant={'inverted'} />
                <SideMenu
                    isOpen={isMenuOpen}
                    onClose={this.onMenuClose}
                    onClick={this.onMenuChoice}
                    title={'Destiny'}
                    subtitle={VERSION}
                    list={this.memoMenuList(store)}
                />
            </div>
        );
    }

    componentDidMount() {
        addFetchListener(this.onFetchChange);
        this.setState({
            isLoading: checkIsLoading(),
        });
    }

    componentWillUnmount() {
        removeFetchListener(this.onFetchChange);
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
            case MENU_SHOW_CONSOLE:
                localStorage.setItem('console', 'emulated');
                window.location.reload();
                break;
            default: {
                const {store} = this.props;
                for (const {id} of store.calendars) {
                    if (id === name) {
                        this.changeCalendarVisibility(id);
                        return;
                    }
                }
                assume(false, `Unexpected menu choice "${name}"!`);
            }
        }
    };

    /**
     *
     */
    onReloadClick = () => {
        window.location.reload();
    };

    /**
     *
     */
    onFetchChange = (isLoading) => {
        this.setState({isLoading});
    };

    /**
     *
     */
    memoMenuList = memoize((store) => {
        const list = [];
        for (const calendarItem of store.calendars) {
            const {id, summary, backgroundColor} = calendarItem;
            const CheckboxIcon = id in store.options.hiddenCalendars ? CheckboxBlankOutline : CheckboxMarked;
            list.push({
                name: id,
                icon: <CheckboxIcon style={{color: backgroundColor}} />,
                label: summary,
            });
        }
        list.push(...MENU);
        return list;
    });

    /**
     *
     */
    changeCalendarVisibility = async (id) => {
        await requestEndpoint(ENDPOINT_TOGGLE_CALENDAR, {
            body: {
                calendarId: id,
            },
        });

        // TODO: simplify
        const {store} = this.props;
        const {hiddenCalendars} = store.options;
        const freshHiddenCalendars = {...hiddenCalendars};
        if (freshHiddenCalendars[id]) {
            delete freshHiddenCalendars[id];
        } else {
            freshHiddenCalendars[id] = true;
        }
        const freshStore = {
            ...store,
            options: {
                ...store.options,
                hiddenCalendars: freshHiddenCalendars,
            },
        };
        this.props.onStoreChange(freshStore);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Bar.propTypes = {
    store: PropTypes.object.isRequired,
    onStoreChange: PropTypes.func.isRequired,
};
export default Bar;
