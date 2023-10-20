import React from 'react';
import {FOOTER_SAFETY, NEW_HEIGHT, PRIMARY_COLOR} from '../SETTINGS.js';
import Button from '../ui/Button.jsx';
import Plus from '../ui/Icons/Plus.jsx';
import {selectEvents} from '../state/selectors.js';
import createEvent from '../state/actions/createEvent.js';
import clearShopping from '../state/actions/clearShopping.js';
import TrashCan from '../ui/Icons/TrashCan.jsx';
import checkShopping from '../system/checkShopping.js';
import {getState} from '../state/store.js';
import parseShopping from '../system/parseShopping.js';
import stringifyShopping from '../system/stringifyShopping.js';
import updateSummary from '../state/actions/updateSummary.js';
import defocus from '../utils/defocus.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: NEW_HEIGHT + FOOTER_SAFETY,
        paddingBottom: FOOTER_SAFETY,
        background: PRIMARY_COLOR,
        display: 'flex',
        flexDirection: 'row',
    },
    selectCalendar: {
        padding: '0 8px',
    },
    input: {
        flexGrow: 1,
        width: '100%',
        border: 'none',
        borderRadius: 20,
        padding: '0 16px',
        margin: 8,
        appearance: 'none',
        background: '#fff',
    },
    plus: {
        height: '100%',
        padding: 8,
    },
    sliver: {
        position: 'absolute',
        inset: '0 0 auto 0',
        height: 1,
        background: 'rgba(0,0,0,0.1)',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Footer extends React.PureComponent {
    state = {
        value: '',
    };

    render() {
        const {value} = this.state;
        return (
            <div css={SX.root}>
                <input
                    type={'search'} // https://stackoverflow.com/a/73466347/844393
                    autoComplete={'off'}
                    css={SX.input}
                    spellCheck={false}
                    value={value}
                    placeholder={'Event'}
                    onChange={this.onInputChange}
                    onKeyDown={this.onInputKeyDown}
                />
                <Button
                    icon={Plus}
                    holdIcon={TrashCan}
                    cssNormal={SX.plus}
                    variant={'inverted'}
                    onClick={this.onPlusClick}
                    onHold={this.onPlusHold}
                    disabled={!value}
                />
                <div css={SX.sliver} />
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onInputChange = (event) => {
        const {value} = event.target;
        this.setState({value});
    };

    /**
     *
     */
    onInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.create();
            defocus();
        }
    };

    /**
     *
     */
    onPlusClick = () => {
        this.create();
    };

    /**
     *
     */
    onPlusHold = () => {
        clearShopping();
        this.setState({value: ''});
    };

    /**
     *
     */
    create = () => {
        const {value} = this.state;
        this.setState({value: ''});

        if (checkShopping(value)) {
            const {title, items} = parseShopping(value);
            const state = getState();
            const events = selectEvents(state);
            const pendingEvent = events.find((event) => {
                const {summary} = event;
                return checkShopping(summary) && parseShopping(summary).title === title;
            });
            if (pendingEvent) {
                const {summary, calendarId, id} = pendingEvent;
                const shoppingStructure = parseShopping(summary);
                shoppingStructure.items.push(...items);
                updateSummary(calendarId, id, stringifyShopping(shoppingStructure));
                return;
            }
        }

        createEvent(value);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default Footer;