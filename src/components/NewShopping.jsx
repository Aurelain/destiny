import React from 'react';
import {BAR_HEIGHT, NEW_HEIGHT} from '../SETTINGS.js';
import PropTypes from 'prop-types';
import {selectShopping} from '../state/selectors.js';
import {connect} from 'react-redux';
import Button from '../utils/ui/Button.jsx';
import toggleShoppingSelection from '../state/actions/toggleShoppingSelection.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        top: BAR_HEIGHT,
        left: 0,
        right: 0,
        bottom: NEW_HEIGHT,
        background: '#fff',
        overflowY: 'scroll',
    },
    item: {
        margin: 10,
        padding: '6px 16px',
        display: 'block',
        textAlign: 'left',
    },
    itemSelected: {
        fontWeight: 'bold',
        color: '#1976d2',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class NewShopping extends React.PureComponent {
    render() {
        const {shopping} = this.props;
        return (
            <div css={SX.root}>
                {shopping.items.map((item, index) => {
                    return (
                        <Button
                            key={item.text}
                            cssNormal={[SX.item, item.isSelected && SX.itemSelected]}
                            label={'● ' + item.text}
                            variant={'simple'}
                            data={index}
                            onClick={this.onItemClick}
                        />
                    );
                })}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onItemClick = ({data: index}) => {
        toggleShoppingSelection(index);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
NewShopping.propTypes = {
    // -------------------------------- redux:
    shopping: PropTypes.shape({
        calendarId: PropTypes.string.isRequired,
        eventId: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                isSelected: PropTypes.bool.isRequired,
            }),
        ),
    }).isRequired,
};

const mapStateToProps = (state) => ({
    shopping: selectShopping(state),
});

export default connect(mapStateToProps)(NewShopping);
