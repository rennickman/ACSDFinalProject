import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { format } from 'date-fns';

import './LeagueMatches.css';
const LeagueMatches = ({ leagueMatch }) => {

//Formatting Time
const gameDate = format(new Date(`${leagueMatch.utcDate}`), 'dd-MM-yyyy');

    return (
          <Container >
            <Link to={'/match/'} state={leagueMatch} id='r_f_link'>
                <Card >
              <Card.Header>
                <Row className="game_week_r_f">
                  <Col sm={6}> Week {leagueMatch.matchday} </Col>
                  <Col sm={6} id='game_date_r_f'> {gameDate} </Col>
                </Row>
              </Card.Header >
              <Card.Body id="game_week_container">
                <Row>
                  <Col sm={5} className='r_f_data'>
                    <h5 id='r_f_text'>{leagueMatch.homeTeam.name}</h5>
                  </Col>
                  <Col sm={2} className='r_f_data'>
                    <Card.Text className='r_f_text'> {leagueMatch.score.fullTime.homeTeam} - {leagueMatch.score.fullTime.awayTeam} </Card.Text>
                  </Col>
                  <Col sm={5} className='r_f_data'>
                    <h5 className='r_f_text'>{leagueMatch.awayTeam.name}</h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            </Link>
          </Container>
    );
};

export default LeagueMatches;