import React from 'react';
import LeagueMatches from '../All League Matches/LeagueMatches';
import Scroll from '../All League Matches/Scroll';
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

            <div className="clubs">
                <h3>List of Clubs:</h3>
                {leagueTable.map((team, index) => <Team team={team} key={index} />)}
            </div>   
            <br></br>
            <div className="clubs">
                <h3>Top Goal Scorers</h3>
                {topScorersTable.map((topScorer, index) => <TopGoalScorer topScorer={topScorer} key={index} />)}
            </div>     
            <br></br>
            <div id="allMatches">
                <h3>Results and Fixtures</h3>
                {matches.map((leagueMatch, index) => <LeagueMatches leagueMatch={leagueMatch} key={index} />)}
            </div>   
            <Scroll/>  
        </div>
    );
};

export default League;