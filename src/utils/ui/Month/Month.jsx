import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../Button.jsx';
import ChevronLeft from '../../../icons/ChevronLeft.jsx';
import ChevronRight from '../../../icons/ChevronRight.jsx';
import buildMonth from './buildMonth.js';

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
        width: 24,
        height: 24,
        lineHeight: '24px',
        borderRadius: '50%',
    },
    foreignNr: {
        color: 'silver',
    },
    todayNr: {
        color: '#f00',
        fontWeight: 'bold',
    },
    markedNr: {
        color: '#fff',
        backgroundColor: '#1976d2',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Month extends React.PureComponent {
    state = {
        browsingDate: null,
    };

    render() {
        const {date} = this.props;
        const {browsingDate} = this.state;

        const mainDate = this.memoMainDate(date);
        const currentDate = browsingDate || mainDate;

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
                        label={'OCT 2023'}
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
            this.setState({
                browsingDate: null,
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoMainDate = memoize((date) => {
        return new Date(date);
    });

    onChevronLeftClick = () => {};
    onMonthClick = () => {};
    onChevronRightClick = () => {};

    onNrClick = ({data: yyyymmdd}) => {
        console.log('yyyymmdd:', yyyymmdd);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Month.propTypes = {
    // -------------------------------- direct:
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Month;
