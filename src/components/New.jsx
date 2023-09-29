import React from 'react';
import {NEW_HEIGHT, PRIMARY_COLOR} from '../SETTINGS.js';
import Button from '../utils/ui/Button.jsx';
import Plus from '../icons/Plus.jsx';

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
        background: PRIMARY_COLOR,
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        flexGrow: 1,
        width: '100%',
        border: 'none',
        borderRadius: 20,
        padding: '0 16px',
        margin: '8px 2px',
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
                <Button icon={Plus} cssNormal={SX.plus} variant={'inverted'} />
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
    onInputChange = () => {};
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
New.propTypes = {};
export default New;
