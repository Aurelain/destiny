import React from 'react';
import Button from '../utils/ui/Button.jsx';
import {BAR_HEIGHT} from '../system/CLIENT.js';
import connectGoogle from '../state/actions/connectGoogle.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: BAR_HEIGHT + 32,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Connect extends React.PureComponent {
    render() {
        return (
            <div css={SX.root}>
                <Button
                    label={
                        <>
                            Connect your
                            <br /> Google Calendar
                        </>
                    }
                    onClick={this.onButtonClick}
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
    onButtonClick = async () => {
        await connectGoogle();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Connect.propTypes = {};
export default Connect;
