import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import './sidebar.css';
import MiniLeagueTable from '../MiniLeagueTable/MiniLeagueTable';



const Sidebar = ({ username, favouriteTeam, favouriteLeague, favouriteFixtures }) => {


    const [nextMatch, setNextMatch] = useState();
    const [last5Matches, setLast5Matches] = useState([]);


    const findNextMatch = () => {
        const fixtures = favouriteFixtures?.filter(match => match.status !== "FINISHED");
        setNextMatch(fixtures[0]);
    };


    const findLast5Matches = () => {
        const results = favouriteFixtures?.filter(match => match.status === "FINISHED");
        const last5 = results.slice(-5).reverse();
        setLast5Matches(last5);
    };



    useEffect(() => {
        if (favouriteFixtures?.length) {
            findNextMatch();
            findLast5Matches();
        } else {
        }
    }, [favouriteFixtures]);

    
   

    
    return (
        <div className='sidebar'>
            <div className="sidebarContainer">
                {username && (
                    <>
                        <div className="welcome">
                            <h4>Welcome {username}</h4>
                        </div>


                        {/* Club Crest */}
                        <div className="crestContainer">
                            <img className='crest' src={favouriteTeam?.crestUrl} alt="club crest" />
                        </div>

                        {/* Club Name */}
                        <div className="clubName">
                            <p>{favouriteTeam?.name}</p>
                        </div>
                    </>
                )}
                
                {/* Next Match */}
                {last5Matches?.length && (
                    < div className="nextGame">
                        <p>Next Game:</p>
                        <h4>{nextMatch?.homeTeam.name} Vs</h4>
                        <h4>{nextMatch?.awayTeam.name}</h4>
                    </div>
                )}
                
                {/* Last 5 Matches */}
                {last5Matches?.length && (
                    <div className="lastGames">
                        {last5Matches?.map(match => (
                            <p>{match.homeTeam.name}  {match.awayTeam.name} </p>
                        ))}
                    </div>
                )}
    
                {favouriteLeague?.length && <MiniLeagueTable standings={favouriteLeague} />}
                
            </div>
        </div>
    );
    
    
};

export default Sidebar;