import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import localforage from 'localforage';
import Button from '../utils/ui/Button.jsx';
import Reload from '../icons/Reload.jsx';
import Menu from '../icons/Menu.jsx';
import SideMenu from '../utils/ui/SideMenu.jsx';
import Console from '../icons/Console.jsx';
import LocationExit from '../icons/LocationExit.jsx';
import {BAR_HEIGHT, PRIMARY_COLOR, STORE_KEY} from '../SETTINGS.js';
import assume from '../utils/assume.js';
import Spin from '../icons/Spin.jsx';
import {addFetchListener, checkIsLoading, removeFetchListener} from '../utils/fetchWithLoading.js';
import CheckboxMarked from '../icons/CheckboxMarked.jsx';
import CheckboxBlankOutline from '../icons/CheckboxBlankOutline.jsx';
import {selectCalendars, selectHiddenCalendars, selectShowDone} from '../state/selectors.js';
import toggleCalendar from '../state/actions/toggleCalendar.js';
import toggleShowDone from '../state/actions/toggleShowDone.js';
import Separator from '../utils/ui/Separator.jsx';
import Avatar from '../utils/ui/Avatar.jsx';
import CheckCircle from '../icons/CheckCircle.jsx';
import CheckCircleOutline from '../icons/CheckCircleOutline.jsx';

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
    hamburger: {
        paddingRight: 64,
    },
    listItem: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    sliver: {
        position: 'absolute',
        inset: 'auto 0 0 0',
        height: 1,
        background: 'rgba(0,0,0,0.1)',
    },
};

const MENU_SHOW_CONSOLE = 'MENU_SHOW_CONSOLE';
const MENU_LOG_OUT = 'MENU_LOG_OUT';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Bar extends React.PureComponent {
    state = {
        isMenuOpen: false,
        isLoading: false,
    };

    render() {
        const {calendars, hiddenCalendars, showDone} = this.props;
        const {isMenuOpen, isLoading} = this.state;
        const reloadIcon = isLoading ? Spin : Reload;
        return (
            <div css={SX.root}>
                <Button
                    icon={Menu}
                    cssNormal={[SX.btn, SX.hamburger]}
                    onClick={this.onMenuClick}
                    variant={'inverted'}
                />
                <div css={SX.grow} />
                <Button
                    icon={showDone ? CheckCircle : CheckCircleOutline}
                    cssNormal={SX.btn}
                    onClick={this.onDoneClick}
                    variant={'inverted'}
                />
                <Button icon={reloadIcon} cssNormal={SX.btn} onClick={this.onReloadClick} variant={'inverted'} />
                <div css={SX.sliver} />
                <SideMenu
                    isOpen={isMenuOpen}
                    onClose={this.onMenuClose}
                    onClick={this.onMenuChoice}
                    title={'Destiny'}
                    list={this.memoMenuList(calendars, hiddenCalendars)}
                    listItemCss={SX.listItem}
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
    onMenuChoice = async ({name}) => {
        switch (name) {
            case MENU_SHOW_CONSOLE:
                localStorage.setItem('console', 'emulated');
                window.location.reload();
                break;
            case MENU_LOG_OUT:
                await localforage.removeItem(STORE_KEY);
                window.location.reload();
                break;
            default: {
                const {calendars} = this.props;
                for (const {id} of calendars) {
                    if (id === name) {
                        toggleCalendar(id);
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
    onDoneClick = () => {
        toggleShowDone();
    };

    /**
     *
     */
    onReloadClick = () => {
        window.scrollTo(0, 0);
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
    memoMenuList = memoize((calendars, hiddenCalendars) => {
        const list = [];
        for (const calendarItem of calendars) {
            const {id, summary, backgroundColor} = calendarItem;
            const CheckboxIcon = id in hiddenCalendars ? CheckboxBlankOutline : CheckboxMarked;
            list.push({
                name: id,
                icon: (
                    <>
                        <CheckboxIcon style={{color: backgroundColor}} />
                        <Avatar name={summary} color={backgroundColor} />
                    </>
                ),
                label: summary,
            });
        }
        list.push(
            ...[
                Separator,
                {
                    name: MENU_SHOW_CONSOLE,
                    icon: Console,
                    label: 'Show console',
                },
                {
                    name: MENU_LOG_OUT,
                    icon: LocationExit,
                    label: 'Log out',
                },
            ],
        );
        return list;
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Bar.propTypes = {
    // -------------------------------- redux:
    calendars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        }),
    ).isRequired,
    hiddenCalendars: PropTypes.objectOf(PropTypes.bool).isRequired,
    showDone: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    calendars: selectCalendars(state),
    hiddenCalendars: selectHiddenCalendars(state),
    showDone: selectShowDone(state),
});

export default connect(mapStateToProps)(Bar);
