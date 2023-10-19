import React from 'react';
import PropTypes from 'prop-types';
import {BOX_SHADOW} from '../../SETTINGS.js';
import Month from '../../ui/Month/Month.jsx';
import Stepper from '../../ui/Stepper.jsx';
import Button from '../../ui/Button.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 16,
        background: '#fff',
        borderRadius: 4,
        boxShadow: BOX_SHADOW,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    apply: {
        width: '100%',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class MonthTime extends React.PureComponent {
    rootRef = React.createRef();
    state = {
        startMinute: 0, // minutes, initialized by the constructor from `this.props.date`
        hasDuration: false,
        duration: 0, // minutes, initialized by the constructor from `this.props.date`
        monthDate: null, // YYYY-MM-DD, initialized by the constructor from `this.props.date`
    };

    constructor(props) {
        super(props);
        Object.assign(this.state, this.parseDate(props.date));
    }

    render() {
        const {date, innerRef, styling} = this.props;
        const {monthDate, startMinute, hasDuration, duration} = this.state;

        const ref = innerRef || this.rootRef;
        return (
            <div css={[SX.root, styling]} ref={ref}>
                <Month date={monthDate || date} onChange={this.onMonthChange} onHold={this.onMonthHold} />
                <Stepper
                    value={startMinute}
                    step={15}
                    min={0}
                    max={24 * 60}
                    onChange={this.onTimeChange}
                    onClick={this.onTimeClick}
                    onHold={this.onTimeHold}
                    renderValue={this.renderTimeValue}
                />
                {hasDuration && (
                    <Stepper value={duration} step={15} min={0} max={24 * 60} onChange={this.onDurationChange} />
                )}
                <Button cssNormal={SX.apply} label={date} onClick={this.onApplyClick} />
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date && this.state.monthDate) {
            this.setState({
                monthDate: null,
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onMonthChange = ({ymd}) => {
        this.setState({
            monthDate: ymd,
        });
    };

    /**
     *
     */
    onMonthHold = ({ymd}) => {
        const {onRelease} = this.props;
        onRelease(stringifyDate(ymd));
    };

    /**
     *
     */
    onApplyClick = () => {
        const {startMinute, duration, monthDate} = this.state;
        const {onRelease} = this.props;
        onRelease(stringifyDate(monthDate, startMinute, duration));
    };

    /**
     *
     */
    renderTimeValue = (value) => {
        const date = new Date(value * 60 * 1000);
        return date.toISOString().substring(11, 16);
    };

    /**
     *
     */
    onTimeChange = ({proposal}) => {
        this.setState({
            startMinute: proposal,
        });
    };

    /**
     *
     */
    onTimeClick = () => {
        this.setState({
            startMinute: this.state.startMinute ? 0 : (24 * 60) / 2,
        });
    };

    /**
     *
     */
    onTimeHold = () => {
        this.setState({
            hasDuration: !this.state.hasDuration,
        });
    };

    /**
     *
     */
    onDurationChange = ({proposal}) => {
        this.setState({
            duration: proposal,
        });
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
MonthTime.propTypes = {
    // -------------------------------- direct:
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
    styling: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: rename to `css`
    innerRef: PropTypes.object,
    onRelease: PropTypes.func.isRequired,
};

export default MonthTime;
