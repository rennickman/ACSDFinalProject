import React, { useEffect } from "react";
import { useState } from "react";
import {Link } from 'react-router-dom';

import { format } from 'date-fns'
import { mapOddsLeagues } from "../../helperFunctions";
import { Container, Card, Row, Col } from "react-bootstrap";
import './currentGameWeek.css'
import { clubCrests } from "../../apiKeys";

const CurrentGameWeek = (props) => {
  const { home, away, time, leagueName, crestHome, crestAway, matchObject } = props;
  const [ leagueTitle, setLeagueTitle ] = useState("")  
  const [ leagueArea, setLeagueArea ] = useState("") 

  //time formatting
  const gameDate = format(new Date(`${time}`), 'dd-MM-yyyy');
  const gameTime = format(new Date(`${time}`), 'k.mm');

  //League Titles
  const settingLeagueTitle = () => {
    if (leagueName === 733) {
      setLeagueTitle(mapOddsLeagues[0].name)
      setLeagueArea("England")
    }
    else if (leagueName === 735){
     setLeagueTitle(mapOddsLeagues[5].name)
     setLeagueArea("Germany")
    }
    else if (leagueName === 757){
     setLeagueTitle(mapOddsLeagues[3].name)
     setLeagueArea("France")
    }
    else if (leagueName === 746){
     setLeagueTitle(mapOddsLeagues[2].name)
     setLeagueArea("Italy")
    }
    else if (leagueName === 742){
     setLeagueTitle(mapOddsLeagues[1].name)
     setLeagueArea("Spain")
    }
    else if (leagueName === 380){
     setLeagueTitle(mapOddsLeagues[4].name)
     setLeagueArea("England")
    }
  }
    useEffect(() => {
      settingLeagueTitle();
    }, [])

  //Adds the league name to the match object
  let matchFormatted = matchObject;
  Object.assign(matchObject, {competition: {name: leagueTitle, area:{name: leagueArea}}});

  return(
    <Link to={'/match/'} state={matchFormatted} key={matchObject.id} className='match_links'>
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
    </Link>
  );
}
export default CurrentGameWeek;