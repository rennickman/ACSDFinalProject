import { useState } from 'react';
import axios from 'axios';

import League from '../../components/League/League';
import './leagues.css';
import Navbar from '../../components/Navbar/Navbar';
import { mapLeagues, findLeagueId } from '../../helperFunctions';
import { footballApi, footballApi1 } from '../../apiKeys';

const LeaguesList = () => {
    const [leagueSelected, setLeagueSelected] = useState(false);
    //All Matches for specified league
    const [matches, setMatches] = useState([]);
    //League Name
    const [competition, setCompetition] = useState({});
    //League Table
    const [leagueTable, setLeagueTable] = useState([]);
    //Top Goal Scorer
    const [topScorersTable, setTopScorersTable] = useState([]);

    // Combined Method - All Relevant League Data
    const fetchLeagueData = async (leagueId) => {
        //Fetching Data via API
        const getLeagueTable = await axios.get(footballApi.link + "competitions/" + leagueId + "/standings",
            { headers: { "X-Auth-Token": footballApi.token } });
        const getLeagueTopGSs = await axios.get(footballApi1.link + "competitions/" + leagueId + "/scorers",
            { headers: { "X-Auth-Token": footballApi1.token } });
        const getMatches = await axios.get(footballApi.link + "competitions/" + leagueId + "/matches",
            { headers: { "X-Auth-Token": footballApi.token } });

        axios.all([getLeagueTable, getLeagueTopGSs, getMatches]).then(
            axios.spread((...allLeagueData) => {
                const leagueCompetitionName = allLeagueData[0].data.competition
                const leagueStandingData = allLeagueData[0].data.standings[0].table
                const leagueTopGSsData = allLeagueData[1].data.scorers
                const leagueMatchesData = allLeagueData[2].data.matches
                //console.log
                console.log(leagueCompetitionName, leagueStandingData, leagueTopGSsData, leagueMatchesData)
                //setting 
                setCompetition(leagueCompetitionName);
                setLeagueTable(leagueStandingData);
                setTopScorersTable(leagueTopGSsData);
                setMatches(leagueMatchesData);
            })
        );
    };
    // Submitt from a when a league is selected
    const handleSubmission = (name) =>{
        // Find the leagueId from helperFunctions
        const searchId = findLeagueId(name);
        // Fetch the league info and table
        fetchLeagueData(searchId);
        setLeagueSelected(true);
    }

    if(leagueSelected){
        return(
            <div className='home'>
                <Navbar />
                {(leagueTable.length !== 0) &&
                <League
                    competition={competition}
                    leagueTable={leagueTable}
                    topScorersTable={topScorersTable}
                    matches={matches} />
            } 
        </div>
        );
    } else {
        return (
            <div>
                <Navbar />
                <div className='content' >
                    <div  className='leagues-title' >
                        <h1>Leagues</h1>
                        <h3>SEASSON 2021-2021</h3>
                    </div>
                </div>
                <div  className='leagues-list' >
                    {
                        mapLeagues.map((i, index) => {
                            return (
                                <div key={index} className='link'  onClick={() =>handleSubmission(i.name)}>
                                    <div  className="card-style">
                                        <div  className="card-body-style" >
                                            <div>
                                                <img src={i.logo} className="card-child" alt={i.name+' logo'}></img>
                                            </div>
                                            <div>
                                                <div className="card-child" >{i.name}</div >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
};

export default LeaguesList;