import React from 'react';
import Button from '../utils/ui/Button.jsx';
import connectGoogle from '../system/connectGoogle.js';
import PropTypes from 'prop-types';
import {BAR_HEIGHT} from '../system/CLIENT.js';

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
        this.props.onChange();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Connect.propTypes = {
    onChange: PropTypes.func.isRequired,
};
export default Connect;
