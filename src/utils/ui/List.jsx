import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import memoize from 'memoize-one';

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
        const {items, itemCss, onClick} = this.props;
        const cssNormal = this.memoCssNormal(itemCss);
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
                        cssNormal={cssNormal}
                    />
                ))}
            </div>
        );
    }

    memoCssNormal = memoize((itemCss) => {
        return {...SX.item, ...itemCss};
    });
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
    itemCss: PropTypes.object,
    onClick: PropTypes.func,
};
export default List;
