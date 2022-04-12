import React, { useState } from 'react';
import axios from 'axios';
import {Tabs, Tab} from 'react-bootstrap';

import './home.css';
import { footballApi, footballApi1 } from '../../apiKeys';
import Navbar from '../../components/Navbar/Navbar';
import League from '../../components/League/League';




const Home = () => {

    //All Matches for specified league
    const [matches, setMatches] = useState([]);
    //League Name
    const [competition, setCompetition] = useState({});
    //League Table
    const [leagueTable, setLeagueTable] = useState([]);
    //Top Goal Scorer
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


    return (
        <div className='home'>
            <Navbar /*fetchLeagueTable={fetchLeagueTable}*/ fetchAllLeagueData={fetchLeagueData} />

        </div>
    );
};



export default Home;