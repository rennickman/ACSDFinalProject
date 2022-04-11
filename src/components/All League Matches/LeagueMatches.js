import React from 'react';
const LeagueMatches = ({ leagueMatch }) => {

    return (
        <div className='matches'>  
          <h2>Week {leagueMatch.matchday}</h2>
          <p>{leagueMatch.homeTeam.name} VS {leagueMatch.awayTeam.name}</p>
          <p>{leagueMatch.score.fullTime.homeTeam} - {leagueMatch.score.fullTime.awayTeam}</p>
          <p>{leagueMatch.utcDate}</p>
        </div>
    );
};

export default LeagueMatches;