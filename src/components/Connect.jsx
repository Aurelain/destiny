import React from 'react';
import Button from '../utils/ui/Button.jsx';
import {ENDPOINT_GET_USER} from '../COMMON.js';
import connectGoogle from '../system/connectGoogle.js';
import requestEndpoint from '../system/requestEndpoint.js';
import PropTypes from 'prop-types';
import {BAR_HEIGHT, CLIENT_USER_KEY} from '../system/CLIENT.js';

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
    componentDidMount() {
        this.requestUser(true);
    }

    /**
     *
     */
    onButtonClick = async () => {
        await connectGoogle();
        this.requestUser();
    };

    /**
     *
     */
    requestUser = async (silent) => {
        let user;
        try {
            user = await requestEndpoint(ENDPOINT_GET_USER);
            localStorage.setItem(CLIENT_USER_KEY, JSON.stringify(user));
            this.props.onUser(user);
        } catch (e) {
            if (silent) {
                // When first using the app, it's normal to not be logged in, so let's not scare the user.
                console.log(`Could not get user! ${e.message}`);
            } else {
                throw new Error(e);
            }
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Connect.propTypes = {
    onUser: PropTypes.func.isRequired,
};
export default Connect;
