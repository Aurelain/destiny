import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import {produce} from 'immer';
import CheckCircle from '../ui/Icons/CheckCircle.jsx';
import CircleOutline from '../ui/Icons/CircleOutline.jsx';
import Button from '../ui/Button.jsx';
import Editable from '../ui/Editable.jsx';
import {selectShowDone} from '../state/selectors.js';
import TrashCan from '../ui/Icons/TrashCan.jsx';
import parseShopping from '../system/parseShopping.js';
import stringifyShopping from '../system/stringifyShopping.js';
import Plus from '../ui/Icons/Plus.jsx';
import Pencil from '../ui/Icons/Pencil.jsx';
import sanitizeSummary from '../system/sanitizeSummary.js';
import collectShoppingSuggestions from '../system/collectShoppingSuggestions.js';
import DotsCircle from '../ui/Animations/DotsCircle.jsx';
import ShoppingSuggestions from './ShoppingSuggestions.jsx';
import FormatListBulletedSquare from '../ui/Icons/FormatListBulletedSquare.jsx';

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
            top: 2,
        },
    },
    emptyItem: {
        display: 'flex',
        alignItems: 'start',
        marginTop: 5,
    },
    itemDone: {
        flexShrink: 0,
    },
    itemText: {
        paddingLeft: 4,
        flexGrow: 1,
    },
    btn: {
        margin: 2,
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
        isLoadingSuggestions: false,
        shoppingSuggestions: null,
    };

    render() {
        const {html, showDone} = this.props;
        const {isRawEditing, isLoadingSuggestions, shoppingSuggestions} = this.state;

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

        if (shoppingSuggestions) {
            return (
                <ShoppingSuggestions
                    list={shoppingSuggestions}
                    onToggle={this.onSuggestionsToggle}
                    onApply={this.onSuggestionsApply}
                    onCancel={this.onSuggestionsCancel}
                />
            );
        }

        const shoppingStructure = this.memoShoppingStructure(html);

        return (
            <div css={[SX.root, isLoadingSuggestions && SX.rootDisabled]} ref={this.rootRef}>
                <Editable html={shoppingStructure.title} onChange={this.onTitleChange} />
                {shoppingStructure.items.map((item, index) => {
                    const {text, isDone} = item;
                    if (text) {
                        if (!showDone && isDone) {
                            return null;
                        }
                        return (
                            <Button
                                key={index}
                                cssNormal={SX.buttonItem}
                                icon={isDone ? CheckCircle : CircleOutline}
                                label={text.replace(/<.*?>/g, '')}
                                holdIcon={isDone ? CircleOutline : CheckCircle}
                                onHold={this.onDoneHold}
                                variant={'simple'}
                                data={index}
                            />
                        );
                    } else {
                        return (
                            <div key={index} css={SX.emptyItem}>
                                <Button
                                    key={index}
                                    icon={CircleOutline}
                                    holdIcon={TrashCan}
                                    onClick={this.onEmptyClick}
                                    variant={'simple'}
                                    data={index}
                                />
                                <Editable
                                    html={text}
                                    onChange={this.onItemChange}
                                    innerCss={SX.itemText}
                                    data={index}
                                />
                            </div>
                        );
                    }
                })}
                <Button cssNormal={SX.btn} icon={Plus} onClick={this.onPlusClick} />
                <Button
                    cssNormal={SX.btn}
                    icon={isLoadingSuggestions ? DotsCircle : FormatListBulletedSquare}
                    onClick={this.onBulletsClick}
                />
                <Button cssNormal={SX.btn} icon={Pencil} onClick={this.onPencilClick} />
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.html !== this.props.html && !this.shoppingStructure.items.at(-1)?.text) {
            // An empty item has just been added
            const editableElements = this.rootRef.current.querySelectorAll('[contenteditable="true"]');
            editableElements[editableElements.length - 1].focus();
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
    onTitleChange = ({value}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.title = value;
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onPlusClick = () => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.items.push({
                text: '',
                isDone: false,
            });
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onBulletsClick = async () => {
        const {title} = this.shoppingStructure;
        this.setState({
            isLoadingSuggestions: true,
        });
        const shoppingSuggestions = await collectShoppingSuggestions(title);
        this.setState({
            isLoadingSuggestions: false,
            shoppingSuggestions,
        });
    };

    /**
     *
     */
    onSuggestionsToggle = ({index}) => {
        const {shoppingSuggestions} = this.state;
        const freshSuggestions = produce(shoppingSuggestions, (draft) => {
            draft[index].isSelected = !draft[index].isSelected;
        });
        this.setState({
            shoppingSuggestions: freshSuggestions,
        });
    };

    /**
     *
     */
    onSuggestionsApply = () => {
        const {shoppingSuggestions} = this.state;
        const selectedItems = shoppingSuggestions.filter((item) => item.isSelected);
        const freshShopping = {
            title: this.shoppingStructure.title,
            items: selectedItems.map((item) => ({
                text: item.text,
                isDone: false,
            })),
        };
        this.announceChange(freshShopping);
        this.setState({
            shoppingSuggestions: null,
        });
    };

    /**
     *
     */
    onSuggestionsCancel = () => {
        this.setState({
            shoppingSuggestions: null,
        });
    };

    /**
     *
     */
    onItemChange = ({value, data: index}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.items[index].text = value;
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onEmptyClick = ({data: index}) => {
        const freshShopping = produce(this.shoppingStructure, (draft) => {
            draft.items.splice(index, 1);
        });
        this.announceChange(freshShopping);
    };

    /**
     *
     */
    onDoneHold = ({data: index}) => {
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
    announceChange = (freshShopping) => {
        const {onChange} = this.props;
        onChange({value: stringifyShopping(freshShopping)});
    };

    /**
     *
     */
    onPencilClick = () => {
        this.setState({isRawEditing: true});
    };

    /**
     *
     */
    onRawChange = ({value}) => {
        const {onChange} = this.props;
        onChange(value);
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
    // -------------------------------- redux:
    showDone: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showDone: selectShowDone(state),
});

export default connect(mapStateToProps)(Shopping);
