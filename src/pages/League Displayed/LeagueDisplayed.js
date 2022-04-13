import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

import League from '../../components/League/League';
import './leaguedisplayed.css';
import Navbar from '../../components/Navbar/Navbar';
import { findLeagueId } from '../../helperFunctions';
import { footballApi, footballApi1, footballApi2 } from '../../apiKeys';

const LeagueDisplayed = () => {

    // Renders useLocation so it takes the league name sent through a League's Link or Home Search bar by 'state'
    const query = useLocation();

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
        const getLeagueTable = await axios.get(footballApi2.link + "competitions/" + leagueId + "/standings",
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

    useEffect(() => {
        function fetchData() {
            if (query.state) {
                // Send the legue name to findLeagueId
                const searchId = findLeagueId(query.state);
                // Starts the API call to render data for that League
                fetchLeagueData(searchId);
            }
        }
        fetchData();
    },[query.state]);
    
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
};

export default LeagueDisplayed;