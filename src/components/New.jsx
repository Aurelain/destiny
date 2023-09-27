import React from 'react';
import {NEW_HEIGHT, PRIMARY_COLOR} from '../system/CLIENT.js';
import Button from '../utils/ui/Button.jsx';

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
New.propTypes = {};
export default New;
