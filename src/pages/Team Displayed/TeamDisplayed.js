import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../firebase';

import './teamdisplayed.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { clubId } from '../../helperFunctions';
import { mapAPIs } from '../../apiKeys';
import TeamMatch from '../../components/Team Match/TeamMatch';


const TeamDisplayed = () => {

    // Renders useLocation so it takes the league name sent through a League's Link or Home Search bar by 'state'
    const query = useLocation();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    // Get current user if logged in
    const currentUser = useAuth();

    //Error for Home page
    const [error, setError] = useState("");

    // Value being searched for in search bar
    const [loading, setLoading] = useState(true);

    //League Table
    const [teamMatches, setTeamMatches] = useState([""]);

    // Sends the team name to find Team's Id
    const team = Object.values(clubId).find((competition) => {
        return competition.name.includes(query.state);
    });

  
    useEffect(() => {
        //If a query came trhought useLocation and a team id was found for that query
        if (query.state && team) {
            async function fetchData() {


                //Leagues array for all the leagues that a club plays in
                let leagues = [];

                //Makes API calls to different token keys untill one is successful
                let apiCall = false;
                var i = 0;
                do{
                    try{
                        //Fetching the leagues that that the team is involved via API
                        const getTeamLeagues  = await axios.get(mapAPIs[i].link + "teams/" + team.id,
                        { headers: { "X-Auth-Token": mapAPIs[i].token } });
                        //If the status of the request is ok it stores matches in useState, stops the loop, and displays the data in the webpage
                        if(getTeamLeagues.status ===  200){
                            //Stores in an array the leagues' codes for that teams
                            for (let j = 0; j<getTeamLeagues.data.activeCompetitions.length; j++) {
                                leagues.push(getTeamLeagues.data.activeCompetitions[j].code);
                            }
                            //Stops the loop
                            apiCall = false;
                        }
                    }catch {
                        //If it is the third error it redirects to the home page and send the error "Too many requests"
                        if (i===2){
                            setError("Too many requests, try again later")
                            console.log("Too many requests, try again later")
                        }else{
                            //If an error is catched keeps the loop running so it makes another call to another apiKey
                            apiCall = true;
                        }
                    }

                    i++;
                    //Runs three times because that's the number of keys that we have
                } while(apiCall && i<3);

                //Leagues array for all the matches by leagues that a club plays in
                let matchesByLeagues = [];

                //Loops throught the leagues array, sending to matchesByLeagues an object containing the name of the league and an array with all the matches for that league
                for(var k = 0; k<leagues.length; k++) {
                        //Makes API calls to different token keys untill one is successful
                        var apiCall2 = false;
                        var l = 0;
                        do{
                            try{
                                //Fetching the leagues that that the team is involved via API
                                const getMatches = await axios.get(mapAPIs[l].link + "competitions/" + leagues[k] + "/matches",
                                { headers: { "X-Auth-Token": mapAPIs[l].token } });
                                //If the status of the request is ok it stores the league name and all maches in matchesByLeague array
                                if(getMatches.status ===  200){
                                    //Filters all the matches where the team plays as awayTeam and as homeTeam
                                    const matchesArray = getMatches.data.matches.filter((match)=>{
                                        return match.awayTeam.id === team.id || match.homeTeam.id === team.id;
                                    });
                                    //Stores in matchesByLeagues all the matches that the team is playing for each league is playing in
                                    matchesByLeagues.push({leagueName: getMatches.data.competition.name, matches: matchesArray});
                                    apiCall2 = false;
                                }
                            }catch {
                                //If it's the last loop and matchesByLeagues still empty, sets the error to be "Too many requests" and redirects to home page
                                if(!matchesByLeagues && k===2 && i===2){
                                    setError("Too many requests, try again later")
                                    console.log("Too many requests, try again later")
                                } else{
                                    //If an error is catched keeps the loop running so it makes another call to another apiKey
                                    apiCall2 = true;
                                }
                            }

                            l++;
                            //Runs three times because that's the number of keys that we have
                        } while(apiCall2 && l<3);
                }
                //sets matchesByLeague in the useStete in order to display it in the web page
                setTeamMatches(matchesByLeagues);
                setLoading(false);
            }
            fetchData();

        } else if (query.state){
            //If the state has come but there was no matches fot the team queried
            setError("There were no matches for that Club")
        }
    },[query.state,team]);
    console.log(teamMatches);

    if (error) {
        //If there is an error, redirects to home page and sends the error to be displayed
        history('/', {state: error});
    } else if(loading){
        //Id the API call hasn't arrived yet renders Loading...
        return (
            <>      
                <div className='team-displayed'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}
                    <div className='team-container'>
                        <h1>Loading...</h1>
                    </div>
                </div>

            </>
        )
    } else {
        return (
            <>
                <div className='team-displayed'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}
                    <div className='team-container'>
                        <h1>{query.state}</h1>
                        {
                            teamMatches.map((league, index) => 
                                <div key={index}>
                                    <h1>{league.leagueName}</h1>
                                    {
                                        league.matches.map((match, index)=>
                                        <TeamMatch match={match} index={index} />
                                        )
                                    }
                                </div>
                            )

                        }
                    </div>
                </div>
            </>
        )
    }


};



export default TeamDisplayed;