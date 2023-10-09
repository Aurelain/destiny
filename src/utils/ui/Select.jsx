import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import List from './List.jsx';
import {createPortal} from 'react-dom';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0)',
        zIndex: 999999,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Select extends React.PureComponent {
    state = {
        isOpen: false,
    };
    buttonRef = React.createRef();
    listRef = React.createRef();

    render() {
        const {button, list} = this.props;
        const {isOpen} = this.state;
        return (
            <>
                {/*TODO use press for quick selection*/}
                <Button {...button} onClick={this.onButtonPress} innerRef={this.buttonRef} />
                {isOpen &&
                    createPortal(
                        <div css={SX.overlay} onClick={this.onOverlayClick}>
                            <List {...list} onRelease={this.onListRelease} innerRef={this.listRef} />
                        </div>,
                        document.body,
                    )}
            </>
        );
    }

    componentDidUpdate() {
        if (this.state.isOpen) {
            this.refreshListPosition();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onButtonPress = () => {
        this.setState({isOpen: true});
    };

    /**
     *
     */
    onOverlayClick = () => {
        this.setState({isOpen: false});
    };

    /**
     *
     */
    onListRelease = ({name}) => {
        this.setState({isOpen: false});
        this.props.onSelect(name);
    };

    /**
     *
     */
    refreshListPosition = () => {
        const list = this.listRef.current;
        const buttonBounds = this.buttonRef.current.getBoundingClientRect();
        const listBounds = list.getBoundingClientRect();
        const left = buttonBounds.left;
        let top = buttonBounds.top + buttonBounds.height;
        if (top + listBounds.height > window.innerHeight) {
            top = buttonBounds.top - listBounds.height;
        }

        list.style.left = left + 'px';
        list.style.top = top + 'px';
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Select.propTypes = {
    button: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
};

export default Select;
