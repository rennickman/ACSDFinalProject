import React from 'react';
import { Container, Table } from 'react-bootstrap';
import LeagueMatches from '../All League Matches/LeagueMatches';
import Scroller from '../All League Matches/Scroll';
import LeagueTable from '../LeagueTable/LeagueTable';
import Team from '../Team/Team';
import TopGoalScorer from '../Top Goal Scorers/TopGoalScorers';

import './league.css'

const League = ({ competition, leagueTable, topScorersTable, matches }) => {

    

    
    return (
        <div className='league'>
            <div className="info">
                <h3>{competition.name}</h3>
                <h2>{competition.area.name}</h2>
            </div>

            <LeagueTable standings={leagueTable} />


            {/** 
            <div className="clubs">
                <h3>List of Clubs:</h3>
                {leagueTable.map((team, index) => <Team team={team} key={index} />)}
            </div>
            **/}
            <br></br>
            <div className="clubs">
                <h3 id='tgs_title'>Top Goal Scorers</h3>
                <Container>
                 <Container>
                 <Table striped bordered hover variant="light" id='top_gs_table'>
                  <thead>
                   <tr>
                    <th className='top_gs_title'> Name </th>
                    <th className='top_gs_title'> Goals Scored </th>
                    <th className='top_gs_title'> Club </th>
                   </tr>
                  </thead>
                </Table>
               </Container>
               {topScorersTable.map((topScorer, index) => <TopGoalScorer topScorer={topScorer} key={index} />)}
               </Container>
            </div>     
            <br></br><Container>
                <h3>Results and Fixtures</h3>  
              </Container>
            <Container id="allMatches">
              
              <Container>
                {matches.map((leagueMatch, index) => <LeagueMatches leagueMatch={leagueMatch} key={index} />)}  
              </Container>
            </Container>   
            <Scroller/>
        </div>
    );
};

export default League;