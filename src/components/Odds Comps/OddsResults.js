import React, { useEffect } from 'react'
import { Row, Col, Container, Card} from 'react-bootstrap'


const OddsResults = (props) => {

  //Date Format
  const dateFormatting = () => {
    const newDate = new Date("2022-04-16T14:00:00Z")
    const formattedDate = newDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    time: "numeric"
  })  
console.log(formattedDate)
  }

useEffect(() => {
  dateFormatting();
}, [])

  const { home_team, away_team, home_team_odds, away_team_odds, draw, title, date, competitionName } = props;
  return (
      <Container>
        {/* Container */}
          <Container>
          <Card>
            {/* Date */}
            <Card.Header> {
              date
            }
            </Card.Header>
            {/* Comp Name */}
            <Card.Header> {competitionName} </Card.Header>
            {/* Teams and Odds */}
            <Card.Body>
              <Row>
                <Col sm={9}>
                <Card.Title>
                  {home_team}
                </Card.Title>
                <Card.Title>
                  {away_team}
                </Card.Title>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Home </h6> 
                  <button className='odds_card_button'> {home_team_odds} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'>{Math.round(`${1/home_team_odds*100}`)}%</h6>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Draw </h6> 
                  <button className='odds_card_button'> {draw} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'>{Math.round(`${1/draw*100}`)}%</h6>
                </Col>
                <Col sm={1} className='odds_card_result_nav'> 
                  <h6 className='odds_card_result'> Away </h6> 
                  <button className='odds_card_button'> {away_team_odds} </button>
                  <h6 className='odds_card_result'> Implied Probability </h6>
                   <h6 className='odds_card_probability'>{Math.round(`${1/away_team_odds*100}`)}%</h6>
                </Col>
              </Row>
              
              <Card.Text>
                <p> These odds are provided by {title}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          </Container>
      </Container>
   )
}

export default OddsResults;