import React from 'react';
import {Global, ThemeProvider} from '@emotion/react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const THEME = {};
const GLOBAL = {
    '*': {
        userSelect: 'none',
        boxSizing: 'border-box',
        fontFamily: 'system-ui',
    },
    html: {
        lineHeight: 1,
        textSizeAdjust: '100%',
    },
    body: {
        margin: 0,
        overscrollBehaviorY: 'contain', // https://stackoverflow.com/a/58614274/844393
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
