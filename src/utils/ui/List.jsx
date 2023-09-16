import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        padding: 16,
        justifyContent: 'start',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class List extends React.PureComponent {
    render() {
        const {items, onClick} = this.props;
        return (
            <div css={SX.root}>
                {items.map(({name, label, icon}) => (
                    <Button
                        key={name}
                        name={name}
                        variant={'simple'}
                        label={label}
                        icon={icon}
                        onClick={onClick}
                        cssNormal={SX.item}
                    />
                ))}
            </div>
        );
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
List.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
            icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        }),
    ),
    onClick: PropTypes.func,
};
export default List;
