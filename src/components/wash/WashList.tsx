import { useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Months } from '../const/Months';
import { Street, defaultStreets } from '../model/Street';
import getWashDayByParams from '../util/WashDayUtil';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WashDay } from '../model/WashDay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './WashList.css';


interface DatePickerParams {
    year: number,
    month: Months
}

const WashList = () => {

    const today = new Date();
    const options = { 'weekday': 'long', 'month': 'long', 'day': '2-digit' };
    const [washDays, setWashDays] = useState<WashDay[]>([]);
    const [streets] = useState<Street[]>(defaultStreets);
    const [monthYear, setMonthYear] = useState<DatePickerParams>({ year: today.getFullYear(), month: today.getMonth() });

    const goMonthNext = () => {
        let year = monthYear.year;
        let month = monthYear.month;

        if (month === Months.Dicembre) {
            month = Months.Gennaio;
            year++;
            setMonthYear({ month: month, year: year });
            return;
        };

        month++;
        setMonthYear({ ...monthYear, month: month });
    }

    const goMonthBack = () => {
        let year = monthYear.year;
        let month = monthYear.month;

        if (month === Months.Gennaio) {
            month = Months.Dicembre;
            year--;
            setMonthYear({ month: month, year: year });
            return;
        };

        month--;
        setMonthYear({ ...monthYear, month: month });
    }

    const refreshWashDay = () => {
        let washDays: WashDay[] = [];

        // eslint-disable-next-line array-callback-return
        streets.map((street, index) => {
            let days: Date[] = [];
            street.occurrences.map(occurrence =>
                days.push(getWashDayByParams(street.weekDay, occurrence, monthYear.year, monthYear.month)))
            washDays.push({ street: street, days: days });
        });

        setWashDays(washDays);
    }

    useEffect(() => {
        refreshWashDay();
    }, []);

    useEffect(() => {
        console.log(monthYear)
        refreshWashDay();
    }, [monthYear]);


    return (
        <>
            <div className="wrapper">

                <Container className="wrapper-caption">
                    <Row>
                        <Col>
                            <h1>Lavaggio</h1>
                        </Col>
                    </Row>
                </Container>


                <Container className="wrapper-header">
                    <Row>
                        <Col>
                            <Button className="btn-secondary" onClick={() => goMonthBack()}><FontAwesomeIcon icon={faArrowLeft} /></Button>
                        </Col>
                        <Col xs={5}>
                            <h3>{`${Months[monthYear.month]} ${monthYear.year}`}</h3>
                        </Col>
                        <Col>
                            <Button className="btn-secondary" onClick={() => goMonthNext()}><FontAwesomeIcon icon={faArrowRight} /></Button>
                        </Col>
                    </Row>
                </Container>

                <Container >
                    {streets.map((street, index) =>
                        <Container className="wrapper-street">
                            <Row className="street-header" key={street.name}>
                                <Col>
                                    <h4>
                                        {street.name}
                                    </h4>
                                </Col>

                            </Row>
                            <Col>
                                {
                                    washDays.filter(washDay => washDay.street === street).slice(0, 1)[0]?.days?.map((day, index) =>
                                        <Row key={day.toString()}>
                                            <Col>
                                                {day.toLocaleDateString('it-IT', options)}
                                            </Col>

                                        </Row>
                                    )
                                }
                            </Col>

                        </Container>
                    )}
                </Container>

            </div>
        </>
    );
}

export default WashList;