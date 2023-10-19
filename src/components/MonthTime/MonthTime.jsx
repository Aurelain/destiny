import React from 'react';
import PropTypes from 'prop-types';
import {BOX_SHADOW} from '../../SETTINGS.js';
import Month from '../../ui/Month/Month.jsx';
import Stepper from '../../ui/Stepper.jsx';
import Button from '../../ui/Button.jsx';
import dissectStartEnd from './dissectStartEnd.js';
import produceStartEnd from './produceStartEnd.js';

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
        const {start, end} = props;
        Object.assign(this.state, dissectStartEnd({start, end}));
    }

    render() {
        const {innerRef, styling} = this.props;
        const {monthDate, startMinute, hasDuration, duration, timeZone} = this.state;

        const {pretty} = produceStartEnd({monthDate, startMinute, duration, timeZone});

        const ref = innerRef || this.rootRef;
        return (
            <div css={[SX.root, styling]} ref={ref}>
                <Month date={monthDate} onChange={this.onMonthChange} onHold={this.onMonthHold} />
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
                {hasDuration && duration && (
                    <Stepper value={duration} step={15} min={0} max={24 * 60} onChange={this.onDurationChange} />
                )}
                <Button cssNormal={SX.apply} label={pretty} onClick={this.onApplyClick} />
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        const {start, end} = this.props;
        if (prevProps.start !== start || prevProps.end !== end) {
            const {startMinute, duration, monthDate} = dissectStartEnd({start, end});
            this.setState({startMinute, duration, monthDate});
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onMonthChange = ({ymd}) => {
        console.log('ymd:', ymd);
        this.setState({
            monthDate: ymd,
        });
    };

    /**
     *
     */
    onMonthHold = ({ymd}) => {
        const {onRelease, timeZone} = this.props;
        const {start, end} = produceStartEnd({monthDate: ymd, startMinute: 0, duration: 0, timeZone});
        onRelease({start, end});
    };

    /**
     *
     */
    onApplyClick = () => {
        const {startMinute, duration, monthDate} = this.state;
        const {onRelease, timeZone} = this.props;
        const {start, end} = produceStartEnd({monthDate, startMinute, duration, timeZone});
        onRelease({start, end});
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
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    timeZone: PropTypes.string.isRequired,
    styling: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: rename to `css`
    innerRef: PropTypes.object,
    onRelease: PropTypes.func.isRequired,
};

export default MonthTime;
