// noinspection HtmlUnknownTarget

import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../utils/ui/Button.jsx';
import Pencil from '../icons/Pencil.jsx';
import Shopping from './Shopping.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 8,
    },
    btn: {
        margin: 2,
        padding: 4,
    },
};
const TYPE_SIMPLE = 'TYPE_SIMPLE';
const TYPE_RICH = 'TYPE_RICH';
const TYPE_SHOPPING = 'TYPE_SHOPPING';

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Summary extends React.PureComponent {
    state = {
        isForcedSimple: false,
    };
    simpleRef = React.createRef();

    render() {
        const {text} = this.props;
        const {isForcedSimple} = this.state;
        const type = isForcedSimple ? TYPE_SIMPLE : this.memoType(text);
        switch (type) {
            case TYPE_SIMPLE:
                return (
                    <div
                        ref={this.simpleRef}
                        css={SX.root}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={this.onTextBlur}
                        spellCheck={false}
                    >
                        {text}
                    </div>
                );
            case TYPE_RICH:
                return (
                    <>
                        <div css={SX.root} dangerouslySetInnerHTML={{__html: addAnchors(text)}} />
                        <Button cssNormal={SX.btn} icon={Pencil} onClick={this.onPencilClick} />
                    </>
                );
            case TYPE_SHOPPING:
                return <Shopping text={text} />;
            default:
            // Impossible
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isForcedSimple && this.state.isForcedSimple) {
            this.simpleRef.current.focus();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoType = memoize((text) => {
        if (text.match(/^\S+:/)) {
            return TYPE_SHOPPING;
        }
        if (text.match(/http/i)) {
            return TYPE_RICH;
        }
        return TYPE_SIMPLE;
    });

    /**
     *
     */
    onTextBlur = (event) => {
        const {innerHTML} = event.currentTarget;
        this.setState({
            isForcedSimple: false,
        });
        console.log('innerHTML:', innerHTML);
    };

    /**
     *
     */
    onPencilClick = () => {
        this.setState({
            isForcedSimple: true,
        });
    };
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const addAnchors = (text) => {
    return text.replace(/(http\S+)/g, '<a href="$1">$1</a>');
};
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Summary.propTypes = {
    text: PropTypes.string.isRequired,
};
export default Summary;
