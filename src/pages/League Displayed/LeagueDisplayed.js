import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'

import './leaguedisplayed.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mapCompetitions } from '../../helperFunctions';
import { mapAPIs } from '../../apiKeys';
import League from '../../components/League/League';


const LeagueDisplayed = ({ userUid }) => {

    // Renders useLocation so it takes the league name sent through a League's Link or Home Search bar by 'state'
    const query = useLocation();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()


    //Error for Home page
    const [error, setError] = useState("");

    //All Matches for specified league
    const [matches, setMatches] = useState([]);
    //League Name
    const [competition, setCompetition] = useState({});
    //League Table
    const [leagueTable, setLeagueTable] = useState([]);
    //Top Goal Scorer
    const [topScorersTable, setTopScorersTable] = useState([]);

    //Finds the code of the league in the helperFunction competitionCode array
    const competitionCode = Object.values(mapCompetitions).find((competition) => {
        return competition.name.includes(query.state);
    });

    // Combined Method - All Relevant League Data
    const fetchLeagueData = async (leagueId) => {
        //Makes API calls to different token keys untill one is successful
        var apiCall = false;
        var i = 0;
        do{
            console.log(i)
            try{

                //Fetching the standings, top scorers and matches from the API where i is the API in apiKeys' array
                const getLeagueTable = await axios.get(mapAPIs[0].link + "competitions/" + leagueId + "/standings",
                    { headers: { "X-Auth-Token": mapAPIs[0].token } });
                const getLeagueTopGSs = await axios.get(mapAPIs[0].link + "competitions/" + leagueId + "/scorers",
                    { headers: { "X-Auth-Token": mapAPIs[0].token } });
                const getMatches = await axios.get(mapAPIs[0].link + "competitions/" + leagueId + "/matches",
                    { headers: { "X-Auth-Token": mapAPIs[0].token } });
            
                //If the status of the requests is ok it stores the standings, top scorers and matchess in useState and stops the loop
                if(getLeagueTable.status ===  200 && getLeagueTopGSs.status ===  200 && getMatches.status ===  200){
                    //Spreads the array to store it in the useState
                    axios.all([getLeagueTable, getLeagueTopGSs, getMatches]).then(
                        axios.spread((...allLeagueData) => {
                            const leagueCompetitionName = allLeagueData[0].data.competition
                            const leagueStandingData = allLeagueData[0].data.standings[0].table
                            const leagueTopGSsData = allLeagueData[1].data.scorers
                            const leagueMatchesData = allLeagueData[2].data.matches
                            //console.log
                            // console.log(leagueCompetitionName, leagueStandingData, leagueTopGSsData, leagueMatchesData)
                            //setting 
                            setCompetition(leagueCompetitionName);
                            setLeagueTable(leagueStandingData);
                            setTopScorersTable(leagueTopGSsData);
                            setMatches(leagueMatchesData);
                        })
                    );
                    apiCall = false;
                }
            }catch {
                //If it is the third error it redirects to the home page and send the error "Too many requests"
                if (i===2){
                    setError("Too many requests, try again later")
                    console.log("Too many requests, try again later")
                }else{
                    //If an error is catched keeps the loop running so it makes another call to another apiKey
                    console.log(`There was an error retrieving the data from the API ${i}`)
                    apiCall = true;
                }
            }

            i++;
            //Runs three times because that's the number of keys that we have
        } while(apiCall && i<3);
    };

    //Renders the API call
    useEffect(() => {
        //If a league as arrived by state from home and a league has been found in mapCompetitions renders the API call
        if (query.state && competitionCode) {
            // Starts the API call to render data for that League
            fetchLeagueData(competitionCode.code);
        } else if (query.state){
            //Sets the error to be no matches for that league
            setError("There were no matches for that league name")
        }
    },[query.state,competitionCode]);

    //If an error exists redirects to home page and sends the error to be displayed display
    if (error) {
        history('/', {state: error});
    } else if (leagueTable.length){
        //Renders the page
        return(
            <>  
                <div className='league-displayed'>
                    {userUid && <Sidebar userUid={userUid} />}
                    <div className='league-container'>
                        <League
                            competition={competition}
                            leagueTable={leagueTable}
                            topScorersTable={topScorersTable}
                            matches={matches} />
                    </div>
                </div>
            </>
        );
    } else {
        //Renders Loading
        return(
            <>  
                <div className='league-displayed'>
                    {userUid && <Sidebar userUid={userUid} />}
                    <div className='league-container'>
                        <h1>Loading...</h1>
                    </div>
                </div>
            </>
        );
    }

};

export default LeagueDisplayed;