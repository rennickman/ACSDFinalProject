import {Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Container, Card, Row, Col } from "react-bootstrap";

import { clubCrests } from "../../apiKeys";

const Match = ({ match, index }) => {
    //Formatting Time
    const gameDate = format(new Date(`${match.utcDate}`), 'dd-MM-yyyy');
    const gameTime = format(new Date(`${match.utcDate}`), 'k.mm');

    return (
        <div key={index+20}>
            <Container >
                <Card >
                    <Card.Header>
                        <Row className="match_headers">
                            <Col sm={6} id='match_header'> {gameDate} </Col>
                            <Col sm={6} id='match_header'> {gameTime} </Col>
                        </Row>
                    </Card.Header >
                    <Card.Body id="match_container">
                        <Row>
                            <Col sm={5} className='teams'>
                            <img className='match_crests' src={clubCrests.link1 + match.homeTeam.id + clubCrests.link2}></img>
                            <h5>{match.homeTeam.name}</h5>
                            </Col>
                            <Col sm={2} className='teams'>
                            <Card.Text id='match_time'> {match.score.fullTime.homeTeam + " - "} {match.score.fullTime.awayTeam} </Card.Text>
                            </Col>
                            <Col sm={5} className='teams'>
                            <img className='match_crests' src={clubCrests.link1 + match.awayTeam.id + clubCrests.link2}></img>
                            <h5>{match.awayTeam.name}</h5>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Header>
                        <Row className="match_headers">
                            <Col sm={12} id='match_header'> {match.status} </Col>
                        </Row>
                    </Card.Header >
                </Card>
            </Container>
        </div>
        
    );
};

export default Match;