import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';

const TodaysMatches = ({ match}) => {
    //Formatting Time
    const gameDate = format(new Date(`${match.utcDate}`), 'dd-MM-yyyy');
    const gameTime = format(new Date(`${match.utcDate}`), 'k.mm');
    return (
        <div>
            
            <h3>{match.competition.name}</h3>
            <Link to={'/match/'} state={match}>
                <Row>
                    <Col>
                        <h5>Status: {match.status + " " + gameDate + " " + gameTime}.</h5>
                    </Col>
                    <Col>
                        <h5>{match.homeTeam.name}</h5>
                    </Col>
                    <Col>
                        <p>
                            {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
                        </p>
                    </Col>
                    <Col>
                        <h5>{match.awayTeam.name}</h5>
                    </Col>
                </Row>
            </Link>
        </div>
    );
};

export default TodaysMatches;