import React from 'react';
import {Global, ThemeProvider} from '@emotion/react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const THEME = {};
const GLOBAL = {
    html: {
        padding: 0,
        margin: 0,
    },
    body: {
        margin: 0,
        padding: 0,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class GlobalStyles extends React.PureComponent {
    render() {
        const {children} = this.props;
        return (
            <ThemeProvider theme={THEME}>
                <Global styles={GLOBAL} />
                {children}
            </ThemeProvider>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
GlobalStyles.propTypes = {
    children: PropTypes.node,
};
export default GlobalStyles;
