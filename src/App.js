import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.css';
import { footballApi, footballApi1 } from './apiKeys';
import Navbar from './components/Navbar/Navbar';
import League from './components/League/League';

function App() {

    const [todaysMatches, setTodaysMatches] = useState([]);
    const [competition, setCompetition] = useState({});
    const [leagueTable, setLeagueTable] = useState([]);
//test
    const [topScorersTable, setTopScorersTable] = useState([]);

/* Commenting ou till we decide which way to code.

    // Method for fetching today's matches for subscribed competitions
    const fetchTodaysMatches = async () => {
        const data = await axios.get(footballApi.link + "matches", 
            { headers: { "X-Auth-Token": footballApi.token } });
        console.log(data.data);
        setTodaysMatches(data.data.matches);
    };

    // Method for fetching league info and table - must enter league ID eg. Prem = PL
    const fetchLeagueTable = async (leagueId) => {
        const data = await axios.get(footballApi.link + "competitions/" + leagueId + "/standings", 
            { headers: { "X-Auth-Token": footballApi.token } });
        setCompetition(data.data.competition);
        setLeagueTable(data.data.standings[0].table);
        console.log(data.data.standings[0].table)
    };
 */   

    // Combined Method - Table and Goal Scorers
    const fetchLeagueData = (leagueId) => {
        const getLeagueTable = axios.get(footballApi.link + "competitions/" + leagueId + "/standings", 
        { headers: { "X-Auth-Token": footballApi.token } });
        const getLeagueTopGSs = axios.get(footballApi1.link + "competitions/" + leagueId + "/scorers", 
        { headers: { "X-Auth-Token": footballApi1.token } });

        axios.all([getLeagueTable, getLeagueTopGSs]).then(
            axios.spread((...allLeagueData) => {
                const leagueCompetitionName = allLeagueData[0].data.competition
                const leagueStandingData = allLeagueData[0].data.standings[0].table
                const leagueTopGSsData = allLeagueData[1].data.scorers

                console.log(leagueCompetitionName, leagueStandingData, leagueTopGSsData)

                setCompetition(leagueCompetitionName);
                setLeagueTable(leagueStandingData);
                setTopScorersTable(leagueTopGSsData);
            })
        )
    }
    useEffect(() => {
        fetchLeagueData();
      }, [])
    return (
        <div className="app">
            <Navbar /*fetchLeagueTable={fetchLeagueTable}*/ fetchAllLeagueData={fetchLeagueData}/>
            {(leagueTable.length !== 0) && <League competition={competition} leagueTable={leagueTable} topScorersTable={topScorersTable}/>}  
        </div>
    );
};

export default App;
