import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import ChevronLeft from './Icons/ChevronLeft.jsx';
import ChevronRight from './Icons/ChevronRight.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        display: 'flex',
        margin: 2,
    },
    value: {
        minWidth: 48,
    },
    btn: {
        margin: 0,
        padding: 4,
    },
};
const HOLDING_INTERVAL = 50;
const EMPTY_FUNCTION = () => 0;

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Stepper extends React.PureComponent {
    holdingInterval;
    holdingDelta;

    render() {
        const {value, min, max, renderValue, onClick, onHold} = this.props;
        return (
            <div css={SX.root}>
                <Button
                    icon={ChevronLeft}
                    cssNormal={SX.btn}
                    disabled={value <= min}
                    onClick={this.onChevronLeftClick}
                    onHold={EMPTY_FUNCTION}
                    onHoldStart={this.onChevronLeftHoldStart}
                    onHoldCancel={this.onChevronLeftHoldCancel}
                    variant={'simple'}
                />
                <Button
                    cssNormal={SX.value}
                    label={renderValue ? renderValue(value) : value}
                    onClick={onClick}
                    onHold={onHold}
                    variant={'simple'}
                />
                <Button
                    icon={ChevronRight}
                    cssNormal={SX.btn}
                    disabled={value >= max}
                    onClick={this.onChevronRightClick}
                    onHold={EMPTY_FUNCTION}
                    onHoldStart={this.onChevronRightHoldStart}
                    onHoldCancel={this.onChevronRightHoldCancel}
                    variant={'simple'}
                />
            </div>
        );
    }

    componentWillUnmount() {
        this.cancelInterval();
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onChevronLeftClick = () => {
        this.announceChange(-this.props.step);
    };

    /**
     *
     */
    onChevronLeftHoldStart = () => {
        this.startInterval(true);
    };

    /**
     *
     */
    onChevronLeftHoldCancel = () => {
        this.cancelInterval();
    };

    /**
     *
     */
    onChevronRightClick = () => {
        this.announceChange(this.props.step);
    };

    /**
     *
     */
    onChevronRightHoldStart = () => {
        this.startInterval(false);
    };

    /**
     *
     */
    onChevronRightHoldCancel = () => {
        this.cancelInterval();
    };

    /**
     *
     */
    startInterval = (isLeft) => {
        const {step} = this.props;
        this.holdingDelta = isLeft ? -step : step;
        this.holdingInterval = setInterval(this.onHoldingInterval, HOLDING_INTERVAL);
    };

    /**
     *
     */
    onHoldingInterval = () => {
        this.announceChange(this.holdingDelta);
    };

    /**
     *
     */
    cancelInterval = () => {
        clearInterval(this.holdingInterval);
        this.holdingDelta = null;
    };

    /**
     *
     */
    announceChange = (delta) => {
        const {onChange, value, min, max} = this.props;
        const proposal = value + delta;
        if (proposal >= min && proposal <= max) {
            onChange({proposal});
        }
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Stepper.defaultProps = {
    value: 0,
    step: 1,
    min: 0,
    max: 100,
};

Stepper.propTypes = {
    value: PropTypes.number.isRequired,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onHold: PropTypes.func,
    renderValue: PropTypes.func,
};
export default Stepper;
