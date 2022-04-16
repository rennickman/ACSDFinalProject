import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const OddsResults = (props) => {
  const { home_team, away_team, home_team_odds, away_team_odds, draw, title } = props;
  return (
        <Container id='Results_Fixtures'>
          <Row>
            <Col>
              <h5>{title}</h5>
            </Col>
            <Col>
              <h5>{home_team} </h5>
            </Col>
            <Col>
              <p>
              {home_team_odds} - {away_team_odds}
              </p>
              <p>
                Draw - {draw}
              </p>
            </Col>
            <Col>
            <h5>{away_team}</h5>
            </Col>
          </Row>
        </Container>
   )
}

export default OddsResults;