import React from 'react';
import PropTypes from 'prop-types';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        borderRadius: '50%',
        width: 32,
        height: 32,
        textAlign: 'center',
        lineHeight: '32px',
        color: '#fff',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Avatar extends React.PureComponent {
    render() {
        const {name, color} = this.props;
        return (
            <div css={SX.root} style={{background: color || generateColor(name)}}>
                {suggestLetters(name)}
            </div>
        );
    }
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const suggestLetters = (name) => {
    return name.substring(0, 2).toLocaleUpperCase();
};

/**
 * https://stackoverflow.com/a/66494926/844393
 */
const generateColor = (stringInput) => {
    const stringUniqueHash = [...stringInput].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
};
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
};
export default Avatar;
