import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import {produce} from 'immer';
import CheckCircle from '../icons/CheckCircle.jsx';
import CircleOutline from '../icons/CircleOutline.jsx';
import Button from '../utils/ui/Button.jsx';
import Editable from '../utils/ui/Editable.jsx';
import {selectShowDone} from '../state/selectors.js';
import sanitizeSummary from '../system/sanitizeSummary.js';

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
    shoppingStructure; // filled by `memoShoppingStructure()`

    render() {
        const {html, showDone} = this.props;
        const shoppingStructure = this.memoShoppingStructure(html);

        // TODO: offer a way to raw edit the whole summary

        return (
            <div css={SX.root}>
                <Editable html={shoppingStructure.title} onChange={this.onTitleChange} />
                {shoppingStructure.items.map((item, index) => {
                    const {text, isDone} = item;
                    if (!showDone && isDone) {
                        return null;
                    }
                    return (
                        <div key={index} css={SX.item}>
                            <Button
                                cssNormal={SX.itemDone}
                                icon={isDone ? CheckCircle : CircleOutline}
                                onClick={this.onDoneClick}
                                onHold={this.onDoneHold}
                                variant={'simple'}
                                data={index}
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
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.title = text;
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onItemChange = (text, {data: index, isEnter}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.items[index].text = text;
        });
        this.announceChange(freshShopping);
        console.log('isEnter:', isEnter);
    };

    /**
     *
     */
    onDoneClick = ({data: index}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            const item = draft.items[index];
            if (item.text) {
                item.isDone = !item.isDone;
            }
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onDoneHold = ({data: index}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.items.splice(index, 1);
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    announceChange = (freshShopping) => {
        const {onChange} = this.props;
        const freshSummary = stringifyShopping(freshShopping);
        onChange(freshSummary);
    };

    /**
     *
     */
    memoShoppingStructure = memoize((html) => {
        this.shoppingStructure = parseShopping(html); // harmless side-effect

        // Ensure there's always exactly one empty slot at the end:
        const {items} = this.shoppingStructure;
        items.push({text: '', isDone: false});
        for (let i = items.length - 2; i >= 0; i--) {
            if (items[i].text) {
                break;
            }
            items.splice(i, 1);
            i--;
        }
        return this.shoppingStructure;
    });
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const parseShopping = (summary) => {
    summary = sanitizeSummary(summary);
    const head = summary.match(/^\S+:/)[0];
    const title = head.substring(0, head.length - 1);

    const body = summary.substring(head.length);
    const parts = body.split(',');
    const items = [];
    for (const part of parts) {
        let text = sanitizeSummary(part);
        let isDone = false;
        if (text.startsWith('-')) {
            text = text.replace(/^-+/, '');
            isDone = true;
        }
        items.push({text, isDone});
    }
    return {title, items};
};

/**
 *
 */
const stringifyShopping = (shoppingStructure) => {
    const cleanItems = [];
    for (const item of shoppingStructure.items) {
        const {text, isDone} = item;
        let draft = '';
        if (isDone) {
            draft += '-';
        }
        draft += prepareTextForSaving(text);
        cleanItems.push(draft);
    }
    let output = prepareTextForSaving(shoppingStructure.title) + ': ' + cleanItems.join(', ');
    output = output.replace(/[\s-,]*$/, '');
    return output;
};

/**
 *
 */
const prepareTextForSaving = (text) => {
    text = sanitizeSummary(text);
    text = text.replace(/<.*?>/g, '');
    return text;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Shopping.propTypes = {
    html: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    // -------------------------------- redux:
    showDone: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showDone: selectShowDone(state),
});

export default connect(mapStateToProps)(Shopping);
