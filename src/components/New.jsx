import React from 'react';
import {NEW_HEIGHT, PRIMARY_COLOR} from '../system/CLIENT.js';
import Button from '../utils/ui/Button.jsx';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: NEW_HEIGHT,
        background: '#e1e0de',
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
    },
    input: {
        flexGrow: 1,
        width: '100%',
        border: 'none',
        borderRadius: 20,
        padding: '0 16px',
        margin: '0 8px',
        // TODO: remove this once we know it's not needed
        // WebkitAppearance: 'none', // https://stackoverflow.com/a/73466347/844393
        // appearance: 'none',
    },
    create: {
        background: PRIMARY_COLOR,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class New extends React.PureComponent {
    state = {
        value: '',
    };
    // TODO: remove this once we know it's not needed
    // uniqueInputName = Math.random().toString(); // https://github.com/terrylinooo/jquery.disableAutoFill

    render() {
        const {value} = this.state;
        return (
            <div css={SX.root}>
                <input
                    type={'search'}
                    autoComplete={'off'}
                    css={SX.input}
                    spellCheck={false}
                    value={value}
                    placeholder={'Event'}
                    onChange={this.onInputChange}
                />
                <Button label={'Create'} cssNormal={SX.create} />
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onInputChange = () => {};
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
New.propTypes = {
    store: PropTypes.object,
};
export default New;
