import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import defocus from '../defocus.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 8,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Editable extends React.PureComponent {
    backupInnerHtml = null;
    isEnter = false;
    rootRef = React.createRef();

    render() {
        const {html, innerCss, innerRef} = this.props;
        return (
            <div
                ref={innerRef || this.rootRef}
                css={this.memoCss(innerCss)}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onFocus={this.onTextFocus}
                onBlur={this.onTextBlur}
                onKeyDown={this.onTextKeyDown}
                spellCheck={false}
                dangerouslySetInnerHTML={{__html: html}}
            />
        );
    }

    componentDidMount() {
        const {autoFocus, innerRef} = this.props;
        if (autoFocus) {
            const root = (innerRef || this.rootRef).current;
            root.focus();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // I N T E R N A L
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onTextFocus = (event) => {
        const {innerHTML} = event.currentTarget;
        this.backupInnerHtml = innerHTML;
    };

    /**
     *
     */
    onTextBlur = (event) => {
        const {innerHTML} = event.currentTarget;
        const {html, onChange, onBlur, data} = this.props;
        if (this.backupInnerHtml !== innerHTML && innerHTML !== html) {
            const {isEnter} = this;
            this.isEnter = false;
            onChange({value: innerHTML, data, event, isEnter});
        }
        onBlur?.();
    };

    /**
     *
     */
    onTextKeyDown = (event) => {
        const {key} = event;
        switch (key) {
            case 'Enter':
                this.isEnter = true;
                defocus();
                break;
            case 'Escape':
                event.currentTarget.innerHTML = this.backupInnerHtml;
                defocus();
                break;
            default:
            // Nothing
        }
    };

    /**
     *
     */
    memoCss = memoize((innerCss) => {
        return [SX.root, innerCss];
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Editable.propTypes = {
    html: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    innerCss: PropTypes.object,
    innerRef: PropTypes.object,
    data: PropTypes.any,
    autoFocus: PropTypes.bool,
};
export default Editable;
