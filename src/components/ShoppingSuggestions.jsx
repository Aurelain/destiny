import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../utils/ui/Button.jsx';
import {selectShoppingSuggestions} from '../state/selectors.js';
import toggleShoppingSuggestion from '../state/actions/toggleShoppingSelection.js';
import clearShoppingSuggestions from '../state/actions/clearShoppingSuggestions.js';
import Check from '../icons/Check.jsx';
import CheckboxMarked from '../icons/CheckboxMarked.jsx';
import CheckboxBlankOutline from '../icons/CheckboxBlankOutline.jsx';
import Close from '../icons/Close.jsx';

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
        const {shoppingSuggestions} = this.props;

        return (
            <div css={SX.root}>
                {shoppingSuggestions.items.map((item, index) => {
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
                <Button cssNormal={SX.btnCheck} icon={Check} onClick={this.onCheckClick} />
                <Button icon={Close} onClick={this.onClearClick} variant={'simple'} />
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
        toggleShoppingSuggestion(index);
    };

    /**
     *
     */
    onClearClick = () => {
        clearShoppingSuggestions();
    };

    /**
     *
     */
    onCheckClick = () => {
        const {onApply, shoppingSuggestions} = this.props;
        const selectedItems = shoppingSuggestions.items.filter((item) => item.isSelected);
        onApply(selectedItems.map((item) => item.text));
        clearShoppingSuggestions();
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
ShoppingSuggestions.propTypes = {
    // -------------------------------- direct:
    onApply: PropTypes.func.isRequired,
    // -------------------------------- redux:
    shoppingSuggestions: PropTypes.object,
};

const mapStateToProps = (state) => ({
    shoppingSuggestions: selectShoppingSuggestions(state),
});

export default connect(mapStateToProps)(ShoppingSuggestions);
