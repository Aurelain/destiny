import React from 'react';
import PropTypes from 'prop-types';
import parseShopping from '../system/parseShopping.js';
import CheckCircle from '../icons/CheckCircle.jsx';
import CircleOutline from '../icons/CircleOutline.jsx';
import Button from '../utils/ui/Button.jsx';
import Editable from '../utils/ui/Editable.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 8,
    },
    item: {
        display: 'flex',
        alignItems: 'start',
        marginTop: 4,
    },
    itemDone: {
        flexShrink: 0,
    },
    itemText: {
        paddingLeft: 4,
        flexGrow: 1,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Shopping extends React.PureComponent {
    render() {
        const {text, showDone} = this.props;
        const shopping = parseShopping(text);
        return (
            <div css={SX.root}>
                <Editable html={shopping.title} onChange={this.onTitleChange} />
                {shopping.items.map((item, index) => {
                    const {text, isDone} = item;
                    return (
                        <div key={index} css={SX.item}>
                            <Button
                                cssNormal={SX.itemDone}
                                icon={isDone ? CheckCircle : CircleOutline}
                                onClick={this.onStatusClick}
                                onHold={this.onStatusHold}
                                variant={'simple'}
                            />
                            <Editable html={text} onChange={this.onItemChange} innerCss={SX.itemText} data={index} />
                        </div>
                    );
                })}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onTitleChange = (text) => {
        console.log('onTitleChange:', text);
    };

    /**
     *
     */
    onItemChange = (text, {data}) => {
        console.log('onItemChange:', text, data);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Shopping.propTypes = {
    text: PropTypes.string.isRequired,
};
export default Shopping;
