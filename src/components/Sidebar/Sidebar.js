import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import './sidebar.css';
import MiniLeagueTable from '../MiniLeagueTable/MiniLeagueTable';



const Sidebar = ({ username, favouriteTeam, favouriteLeague, favouriteFixtures }) => {


    const [nextMatch, setNextMatch] = useState();
    const [last5Matches, setLast5Matches] = useState([]);
    const [leaguePosition, setLeaguePosition] = useState();
    const [filteredLeague, setFilteredLeague] = useState([]);



    // Method to find next match
    const findNextMatch = () => {
        const fixtures = favouriteFixtures?.filter(match => match.status !== "FINISHED");
        setNextMatch(fixtures[0]);
    };


    // Method to find last 5 matches
    const findLast5Matches = () => {
        const results = favouriteFixtures?.filter(match => match.status === "FINISHED");
        const last5 = results.slice(-5).reverse();
        setLast5Matches(last5);
    };


    // Method to filter down the league to 7 positions
    const filterLeague = (league) => {
        // Find League Position
        league.map(place => {
            if (place.team.id === favouriteTeam.id) {
                setLeaguePosition(place.position);
            }
        });
        
        // Top of the table
        if (leaguePosition <= 4) {
            const filteredArray = league.slice(0, 7);
            setFilteredLeague(filteredArray);

        } else if (leaguePosition >= (favouriteLeague.length - 3)) {
            const filteredArray = league.slice(favouriteLeague.length - 7, favouriteLeague.length);
            setFilteredLeague(filteredArray);

        } else if (leaguePosition > 4 && leaguePosition < (favouriteLeague.length - 3) ) {
            const filteredArray = league.slice(leaguePosition - 4, leaguePosition + 3);
            setFilteredLeague(filteredArray);
        }
    }


    // Sets next match and results when rendered or fixtures changes
    useEffect(() => {
        if (favouriteFixtures?.length) {
            findNextMatch();
            findLast5Matches();
        }
    }, [favouriteFixtures]);


    // Sets filtered league table when rendered or league changes
    useEffect(() => {
        if (favouriteLeague?.length) {
            filterLeague(favouriteLeague);
        }
    }, [favouriteLeague, nextMatch]);


    
    




    if (filteredLeague.length === 7) {
        return (
            <div className='sidebar'>
                <div className="sidebarContainer">
                    {username && (
                        <div className="userSection">
                            {/* Username */}
                            <div className='username'>Welcome {username}</div>

                            {/* Club Crest */}
                            <div className="crestContainer">
                                <img className='crest' src={favouriteTeam?.crestUrl} alt="club crest" />
                            </div>

                            {/* Club Name */}
                            <div className="clubName">
                                <p>{favouriteTeam?.name}</p>
                            </div>
                        </div>
                    )}

                    {last5Matches?.length && (
                        <div className="sidebarFixtures">
                            {/* Next Match */}
                            <div className="nextGame">
                                <div className='heading'>Next Game:</div>
                                <div className="teams">
                                    <div className='team'>{nextMatch?.homeTeam.name} Vs</div>
                                    <div className='team'>{nextMatch?.awayTeam.name}</div>
                                </div>
                                
                                <div className='date'>{format(new Date(`${nextMatch?.utcDate}`), 'dd/MM/yy')}</div>
                                <div className='time'>{nextMatch?.utcDate.slice(11, 16)}</div>
                            </div>

                            {/* last 5 Games */}
                            <div className="lastGames">
                                {last5Matches?.map(match => (
                                    
                                    <div className='result'>
                                        <div style={{ fontSize: "12px" }}>{format(new Date(`${match.utcDate}`), 'dd/MM/yy')}</div>
                                        <div>
                                            <span className='resultName'>{match.homeTeam.name}</span> 
                                            <span className='resultScore'>{match.score.fullTime.homeTeam}</span>
                                        </div>
                                        <div className='awayTeam'>
                                            <span className='resultName'>{match.awayTeam.name}</span>
                                            <span className='resultScore'>{match.score.fullTime.awayTeam}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredLeague?.length && <MiniLeagueTable standings={filteredLeague} />}

                </div>
            </div>
        );

    } else {
        return (
            <div className='sidebar'>
                <div className="sidebarContainer">
                    {username && (
                        <div className="userSection">
                            {/* Username */}
                            <div className='username'>Welcome {username}</div>

                            {/* Club Crest */}
                            <div className="crestContainer">
                                <img className='crest' src={favouriteTeam?.crestUrl} alt="club crest" />
                            </div>

                            {/* Club Name */}
                            <div className="clubName">
                                <p>{favouriteTeam?.name}</p>
                            </div>
                        </div>
                    )}

                    {last5Matches?.length && (
                        <div className="sidebarFixtures">
                            {/* Next Match */}
                            <div className="nextGame">
                                <div className='heading'>Next Game:</div>
                                <div className="teams">
                                    <div className='team'>{nextMatch?.homeTeam.name} Vs</div>
                                    <div className='team'>{nextMatch?.awayTeam.name}</div>
                                </div>

                                <div className='date'>{format(new Date(`${nextMatch?.utcDate}`), 'dd/MM/yy')}</div>
                                <div className='time'>{nextMatch?.utcDate.slice(11, 16)}</div>
                            </div>

                            {/* last 5 Games */}
                            <div className="lastGames">
                                {last5Matches?.map(match => (

                                    <div className='result'>
                                        <div style={{ fontSize: "12px" }}>{format(new Date(`${match.utcDate}`), 'dd/MM/yy')}</div>
                                        <div>
                                            <span className='resultName'>{match.homeTeam.name}</span>
                                            <span className='resultScore'>{match.score.fullTime.homeTeam}</span>
                                        </div>
                                        <div className='awayTeam'>
                                            <span className='resultName'>{match.awayTeam.name}</span>
                                            <span className='resultScore'>{match.score.fullTime.awayTeam}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    
    
};

export default Sidebar;