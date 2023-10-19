import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button.jsx';
import ChevronLeft from '../Icons/ChevronLeft.jsx';
import ChevronRight from '../Icons/ChevronRight.jsx';
import buildMonth from './buildMonth.js';
import {LOCALE} from '../../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {},
    btn: {
        margin: 2,
        padding: 4,
    },
    navigation: {display: 'flex'},
    grow: {
        flexGrow: 1,
    },
    row: {
        display: 'flex',
    },
    nr: {
        padding: 0,
        width: 32,
        height: 32,
        lineHeight: '32px',
        borderRadius: '50%',
        textAlign: 'center',
    },
    foreignNr: {
        color: 'silver',
    },
    todayNr: {
        color: '#f00',
        fontWeight: 'bold',
    },
    markedNr: {
        border: 'solid 2px #1976d2',
        // color: '#fff',
        // backgroundColor: '#1976d2',
    },
};
const WEEKDAYS = ['2023-10-16', '2023-10-17', '2023-10-18', '2023-10-19', '2023-10-20', '2023-10-21', '2023-10-22'];
const TODAY_WEEKDAY_INDEX = new Date().getDay();
const WEEKDAY_NAMES_ROW = (
    <div css={SX.row}>
        {WEEKDAYS.map((ymd) => {
            const date = new Date(ymd);
            const isTodayWeekday = date.getDay() === TODAY_WEEKDAY_INDEX;
            return (
                <div key={ymd} css={[SX.nr, isTodayWeekday && SX.todayNr]}>
                    {date.toLocaleString(LOCALE, {weekday: 'narrow'})}
                </div>
            );
        })}
    </div>
);

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Month extends React.PureComponent {
    state = {
        mainDate: null,
        currentDate: null,
    };

    constructor(props) {
        super(props);
        Object.assign(this.state, parseDate(props.date));
    }

    render() {
        const {mainDate, currentDate} = this.state;

        const month = buildMonth({
            date: currentDate,
            markedDate: mainDate,
        });

        return (
            <div css={SX.root}>
                <div css={SX.navigation}>
                    <Button
                        icon={ChevronLeft}
                        cssNormal={SX.btn}
                        onClick={this.onChevronLeftClick}
                        variant={'simple'}
                    />
                    <Button
                        label={getMonthName(currentDate)}
                        cssNormal={[SX.btn, SX.grow]}
                        onClick={this.onMonthClick}
                        variant={'simple'}
                    />
                    <Button
                        icon={ChevronRight}
                        cssNormal={SX.btn}
                        onClick={this.onChevronRightClick}
                        variant={'simple'}
                    />
                </div>
                {WEEKDAY_NAMES_ROW}
                {month.map((row, index) => {
                    return (
                        <div css={SX.row} key={index}>
                            {row.map((item) => {
                                const {ymd, isForeign, isToday, isMarked} = item;
                                return (
                                    <Button
                                        key={ymd}
                                        css={[
                                            SX.nr,
                                            isForeign && SX.foreignNr,
                                            isToday && SX.todayNr,
                                            isMarked && SX.markedNr,
                                        ]}
                                        data={ymd}
                                        label={ymd.substring(8).replace(/^0/, '')}
                                        variant={'simple'}
                                        onClick={this.onNrClick}
                                        onHold={this.onNrHold}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState(parseDate(this.props.date));
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onChevronLeftClick = () => {
        const {currentDate} = this.state;
        this.setState({
            currentDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        });
    };

    /**
     *
     */
    onMonthClick = () => {
        const {mainDate} = this.state;
        this.setState({
            currentDate: new Date(mainDate.getFullYear(), mainDate.getMonth(), 1),
        });
    };

    /**
     *
     */
    onChevronRightClick = () => {
        const {currentDate} = this.state;
        this.setState({
            currentDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
        });
    };

    /**
     *
     */
    onNrClick = ({data: ymd}) => {
        const {onChange} = this.props;
        onChange({ymd});
    };

    /**
     *
     */
    onNrHold = ({data: ymd}) => {
        const {onHold} = this.props;
        onHold({ymd});
    };
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const parseDate = (date) => {
    date = new Date(date);
    return {
        mainDate: date,
        currentDate: new Date(date.getFullYear(), date.getMonth(), 1), // first day of month
    };
};

/**
 *
 */
const getMonthName = (date) => {
    return date
        .toLocaleDateString('ro-RO', {month: 'long', year: 'numeric'})
        .replace(/^./, (c) => c.toLocaleUpperCase());
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Month.propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
    onHold: PropTypes.func,
};

export default Month;
