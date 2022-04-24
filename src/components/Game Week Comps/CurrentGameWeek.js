import React, { useEffect } from "react";
import { useState } from "react";

import { format } from 'date-fns'
import { mapOddsLeagues } from "../../helperFunctions";
import { Container, Card, Row, Col } from "react-bootstrap";
import './currentGameWeek.css'
import { clubCrests } from "../../apiKeys";

const CurrentGameWeek = (props) => {
  const { home, away, time, leagueName, crestHome, crestAway } = props;
  const [ leagueTitle, setLeagueTitle ] = useState("")  

  //time formatting
  const gameDate = format(new Date(`${time}`), 'dd-MM-yyyy');
  const gameTime = format(new Date(`${time}`), 'k.mm');

  //League Titles
  const settingLeagueTitle = () => {
    if (leagueName === 733) {
      setLeagueTitle(mapOddsLeagues[0].name)
    }
    else if (leagueName === 735){
     setLeagueTitle(mapOddsLeagues[5].name)
    }
    else if (leagueName === 757){
     setLeagueTitle(mapOddsLeagues[3].name)
    }
    else if (leagueName === 746){
     setLeagueTitle(mapOddsLeagues[2].name)
    }
    else if (leagueName === 742){
     setLeagueTitle(mapOddsLeagues[1].name)
    }
    else if (leagueName === 380){
     setLeagueTitle(mapOddsLeagues[4].name)
    }
  }
    useEffect(() => {
      settingLeagueTitle();
    }, [])
  return(
    <Container >
      <Card >
        <Card.Header>
          <Row className="game_week_headers">
            <Col sm={6}> {leagueTitle} </Col>
            <Col sm={6} id='game_date_header'> {gameDate} </Col>
          </Row>
        </Card.Header >
        <Card.Body id="game_week_container">
          <Row>
            <Col sm={5} className='teams'>
              <img className='game_week_crests' src={clubCrests.link1 + crestHome + clubCrests.link2}></img>
              <h5>{home}</h5>
            </Col>
            <Col sm={2} className='teams'>
              <Card.Text id='game_week_time'> {gameTime} </Card.Text>
            </Col>
            <Col sm={5} className='teams'>
              <img className='game_week_crests' src={clubCrests.link1 + crestAway + clubCrests.link2}></img>
              <h5>{away}</h5>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default CurrentGameWeek;