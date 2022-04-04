import React, { useState } from 'react';
import { footballApi } from './apiKeys';
import axios from 'axios';


function App() {


    const [todaysMatches, setTodaysMatches] = useState([]);
    const [leagueTable, setLeagueTable] = useState([]);
    const [cometitionMatches, setCompetitionMatches] = useState([]);
    
   

    // Method for fetching today's matches for subscribed competitions
    const fetchTodaysMatches = async () => {
        const data = await axios.get(footballApi.link + "matches", 
            { headers: { "X-Auth-Token": footballApi.token } });
        setTodaysMatches(data.data.matches);
    };


    // Method for fetching league table - must enter league ID eg. Prem = PL
    const fetchLeagueTable = async () => {
        const data = await axios.get(footballApi.link + "competitions/PL/standings", 
            { headers: { "X-Auth-Token": footballApi.token } });
        setLeagueTable(data.data.standings[0].table);
    };


    // Method for fetching all matches for particular competition - filter by matchday
    const fetchCompetitionMatches = async () => {
        const data = await axios.get(footballApi.link + "competitions/PL/matches?matchday=15",
            { headers: { "X-Auth-Token": footballApi.token } });
        setCompetitionMatches(data.data.matches);
    };

    
    

    return (
        <div className="app">
            {/* Buttons for testing API calls */}
            <button onClick={fetchTodaysMatches}>Test Todays Matches</button>
            <button onClick={fetchLeagueTable}>Test League Table</button>
            <button onClick={fetchCompetitionMatches}>Test Competition Matches</button>
        </div>
    );
};

export default App;
