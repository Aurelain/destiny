import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import {produce} from 'immer';
import Button from '../ui/Button.jsx';
import Editable from '../ui/Editable.jsx';
import parseShopping from '../system/parseShopping.js';
import stringifyShopping from '../system/stringifyShopping.js';
import Plus from '../ui/Icons/Plus.jsx';
import sanitizeSummary from '../system/sanitizeSummary.js';
import CheckboxMarked from '../ui/Icons/CheckboxMarked.jsx';
import CheckboxBlankOutline from '../ui/Icons/CheckboxBlankOutline.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 8,
    },
    rootDisabled: {
        pointerEvents: 'none',
    },
    item: {
        display: 'flex',
        alignItems: 'start',
        marginTop: 4,
        '& > svg': {
            marginTop: 4,
        },
    },
    buttonItem: {
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
            top: 4,
        },
        minHeight: 0,
    },
    itemDone: {
        flexShrink: 0,
    },
    plusEditable: {
        paddingLeft: 4,
        flexGrow: 1,
        borderBottom: '1px solid gray',
    },
    btn: {
        margin: 2,
    },
    title: {
        cursor: 'text',
        padding: 8,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Shopping extends React.PureComponent {
    shoppingStructure; // filled by `memoShoppingStructure()`
    plusTimeout;
    rootRef = React.createRef();
    state = {
        isRawEditing: false,
    };

    render() {
        const {html} = this.props;
        const {isRawEditing} = this.state;

        if (isRawEditing) {
            return (
                <Editable
                    html={sanitizeSummary(html)}
                    onChange={this.onRawChange}
                    onBlur={this.onRawCancel}
                    autoFocus={true}
                />
            );
        }

        const shoppingStructure = this.memoShoppingStructure(html);

        return (
            <div css={[SX.root]} ref={this.rootRef}>
                <div css={SX.title} onClick={this.onTitleClick}>
                    {shoppingStructure.title}:
                </div>
                {shoppingStructure.items.map((item, index) => {
                    const {text, isDone} = item;
                    return (
                        <Button
                            key={index}
                            cssNormal={SX.buttonItem}
                            icon={isDone ? CheckboxMarked : CheckboxBlankOutline}
                            label={text.replace(/<.*?>/g, '')}
                            onClick={this.onItemClick}
                            onHold={this.onItemHold}
                            variant={'simple'}
                            data={index}
                        />
                    );
                })}
                <div css={SX.item}>
                    <Plus />
                    <Editable html={''} onChange={this.onPlusChange} innerCss={SX.plusEditable} stickyFocus={true} />
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.html !== this.props.html && !this.shoppingStructure.items.at(-1)?.text) {
            // An empty item has just been added
            const root = this.rootRef.current;
            if (root) {
                // TODO: how can root be missing? Happens when you apply a suggested list over an empty shopping list.
                const editableElements = this.rootRef.current.querySelectorAll('[contenteditable="true"]');
                editableElements[editableElements.length - 1]?.focus();
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.plusTimeout);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onTitleClick = () => {
        this.setState({isRawEditing: true});
    };

    /**
     *
     */
    onPlusChange = ({value, event}) => {
        if (value) {
            const freshShopping = produce(this.shoppingStructure, (draft) => {
                draft.items.push({
                    text: value,
                    isDone: false,
                });
            });
            this.announceChange(freshShopping);
            event.currentTarget.innerHTML = '';
        }
    };

    /**
     *
     */
    onItemClick = async ({data: index}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            const item = draft.items[index];
            item.isDone = !item.isDone;
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onItemHold = async ({data: index}) => {
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
        onChange({value: stringifyShopping(freshShopping)});
    };

    /**
     *
     */
    onRawChange = ({value}) => {
        const {onChange} = this.props;
        onChange({value});
        this.setState({isRawEditing: false});
    };

    /**
     *
     */
    onRawCancel = () => {
        this.setState({isRawEditing: false});
    };

    /**
     *
     */
    memoShoppingStructure = memoize((html) => {
        this.shoppingStructure = parseShopping(html); // harmless side-effect
        return this.shoppingStructure;
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Shopping.propTypes = {
    html: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Shopping;
