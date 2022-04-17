import React from 'react'
import { Row, Col, Container, Card} from 'react-bootstrap'
import { format } from 'date-fns'

import './oddsResults.css'

const OddsResults = (props) => {
  const { home_team, away_team, home_team_odds, away_team_odds, draw, title, date, competitionName } = props;

  //Formatting Time
  const gameDate = format(new Date(`${date}`), 'dd-MM-yyyy');
  const gameTime = format(new Date(`${date}`), 'k.mm');

  // Implied Probability Calculator
  const homeTeamProb = Math.round(`${1/home_team_odds*100}`);
  const awayTeamProb = Math.round(`${1/away_team_odds*100}`);
  const drawProb = Math.round(`${1/draw*100}`);

  return (
      <Container>
        {/* Container */}
          <Container>
          <Card>
            {/* Comp Name & Date */}
            <Card.Header>
              <Row>
                <Col sm={6}> {competitionName} </Col>
                <Col sm={6} className='odds_card_game_date'> {gameDate} </Col>
              </Row>
            </Card.Header>
            {/* Teams and Odds */}
            <Card.Body>
              <Row>
                <Col sm={9}>
                  <Card.Title>{home_team} </Card.Title>
                  <Card.Title> {away_team} </Card.Title>
                  <Card.Text>  @ {gameTime} </Card.Text>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Home </h6> 
                  <button className='odds_card_button'> {home_team_odds} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'> {homeTeamProb}% </h6>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Draw </h6> 
                  <button className='odds_card_button'> {draw} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'> {drawProb}% </h6>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Away </h6> 
                  <button className='odds_card_button'> {away_team_odds} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'> {awayTeamProb}% </h6>
                </Col>
              </Row>
              <Card.Text>
                <span> These odds are provided by {title}</span>
              </Card.Text>
            </Card.Body>
          </Card>
          </Container>
      </Container>
   )
}

export default OddsResults;