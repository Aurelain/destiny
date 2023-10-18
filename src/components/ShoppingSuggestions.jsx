import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button.jsx';
import Check from '../ui/Icons/Check.jsx';
import CheckboxMarked from '../ui/Icons/CheckboxMarked.jsx';
import CheckboxBlankOutline from '../ui/Icons/CheckboxBlankOutline.jsx';
import Close from '../ui/Icons/Close.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 8,
    },
    item: {
        padding: '0',
        display: 'block',
        textAlign: 'left',
        lineHeight: '32px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '& > svg': {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'text-bottom',
            top: 2,
        },
    },
    btnCheck: {
        marginTop: 10,
        marginRight: 10,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class ShoppingSuggestions extends React.PureComponent {
    render() {
        const {list, onApply, onCancel} = this.props;

        return (
            <div css={SX.root}>
                {list.map((item, index) => {
                    return (
                        <Button
                            key={item.text}
                            cssNormal={SX.item}
                            icon={item.isSelected ? CheckboxMarked : CheckboxBlankOutline}
                            label={item.text.replace(/<.*?>/g, '')}
                            variant={'simple'}
                            data={index}
                            onClick={this.onItemClick}
                        />
                    );
                })}
                <Button cssNormal={SX.btnCheck} icon={Check} onClick={onApply} />
                <Button icon={Close} onClick={onCancel} variant={'simple'} />
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onItemClick = ({data: index}) => {
        const {onToggle} = this.props;
        onToggle({index});
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
ShoppingSuggestions.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            isSelected: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ShoppingSuggestions;
