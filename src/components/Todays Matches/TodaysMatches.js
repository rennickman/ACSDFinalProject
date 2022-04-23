import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import {Link} from 'react-router-dom';

import { mapCompetitions } from '../../helperFunctions';

const TodaysMatches = ({ match}) => {
    //Formatting Time
    const gameDate = format(new Date(`${match.utcDate}`), 'dd-MM-yyyy');
    const gameTime = format(new Date(`${match.utcDate}`), 'k.mm');

    //Finds the competition to check if is available
    const competition = Object.values(mapCompetitions).find((competition) => {
        return competition.name.includes(match.competition.name.toLowerCase());
    });

    //If it's one of our availables competitions it displays the match
    if(competition){
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
    }

};

export default TodaysMatches;