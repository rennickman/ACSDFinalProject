import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './LeagueMatches.css'
const LeagueMatches = ({ leagueMatch }) => {

    return (
        <Container id='Results_Fixtures'>
          <Row>
            <Col>
              <h5>Week {leagueMatch.matchday}</h5>
            </Col>
            <Col>
              <h5>{leagueMatch.homeTeam.name}</h5>
            </Col>
            <Col>
              <p>
              {leagueMatch.score.fullTime.homeTeam} - {leagueMatch.score.fullTime.awayTeam}
              </p>
            </Col>
            <Col>
            <h5>{leagueMatch.awayTeam.name}</h5>
            </Col>
          </Row>
        </Container>
    );
};

export default LeagueMatches;