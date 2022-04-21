import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../firebase';

import './matchdisplayed.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { clubId } from '../../helperFunctions';
import { mapAPIs } from '../../apiKeys';
import Footer from '../../components/Footer/Footer';

const MatchDisplayed = () => {

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
    const team1 = Object.values(clubId).find((competition) => {
        return competition.name.includes(query.state.team1);
    });

    // Sends the team name to find Team's Id
    const team2 = Object.values(clubId).find((competition) => {
        return competition.name.includes(query.state.team2);
    });

    //Stores teams id in an array for loop to use
    const teams = [team1, team2];

    //Length of the mapAPIs
    const apiLength = Object.keys(mapAPIs).length


    useEffect(() => {
        //If a query came trhought useLocation and a team id was found for that query
        if (query.state && team1 && team2) {
            async function fetchData() {

                //Leagues array for all the leagues that the clubs plays in
                let leaguesForTeams = [];

                //Makes API calls to different token keys untill one is successful
                let apiCall = false;
                var i = 0;
                do{
                    try{
                        //Fetching the leagues that that the team is involved via API
                        const getTeamLeagues  = await axios.get(mapAPIs[i].link + "teams/" + team1.id,
                        { headers: { "X-Auth-Token": mapAPIs[i].token } });
                        //If the status of the request is ok it stores matches in useState, stops the loop, and displays the data in the webpage
                        if(getTeamLeagues.status ===  200){
                            //Stores in an array the leagues' codes for that teams
                            for (let k = 0; k<getTeamLeagues.data.activeCompetitions.length; k++) {
                                leaguesForTeams.push(getTeamLeagues.data.activeCompetitions[k].code);
                            }
                            //Stops the loop
                            apiCall = false;
                        }
                    }catch {
                        //If it is the third error it redirects to the home page and send the error "Too many requests"
                        if (!leaguesForTeams && i===teams.length-1 && i===apiLength-1){
                            setError("Too many requests, try again later")
                            console.log("Too many requests, try again later")
                        }else{
                            //If an error is catched keeps the loop running so it makes another call to another apiKey
                            apiCall = true;
                        }
                    }

                    i++;
                    //Runs three times because that's the number of keys that we have
                } while(apiCall && i<apiLength);

                //Leagues array for all the matches by leagues that a club plays in
                let matchesByLeagues = [];

                //Loops throught the leagues array, sending to matchesByLeagues an object containing the name of the league and an array with all the matches for that league
                for(var l = 0; l<leaguesForTeams.length; l++) {
                        //Makes API calls to different token keys untill one is successful
                        var apiCall2 = false;
                        var m = 0;
                        do{
                            try{
                                //Fetching the leagues that that the team is involved via API
                                const getMatches = await axios.get(mapAPIs[m].link + "competitions/" + leaguesForTeams[l] + "/matches",
                                { headers: { "X-Auth-Token": mapAPIs[m].token } });
                                //If the status of the request is ok it stores the league name and all maches in matchesByLeague array
                                if(getMatches.status ===  200){
                                    //Filters all the matches where the team plays as awayTeam and as homeTeam
                                    const matchesArray = getMatches.data.matches.filter((match)=>{
                                        return (match.awayTeam.id === team1.id && match.homeTeam.id === team2.id) || (match.awayTeam.id === team2.id && match.homeTeam.id === team1.id);
                                    });
                                    //Stores in matchesByLeagues all the matches that the team is playing for each league is playing in
                                    if (matchesArray.length){
                                        matchesByLeagues.push({matches: matchesArray});
                                    }
                                    apiCall2 = false;
                                }
                            }catch (e){
                                //If it's the last loop and matchesByLeagues still empty, sets the error to be "Too many requests" and redirects to home page
                                if(!matchesByLeagues && m === apiLength-1 && l === leaguesForTeams.length-1){
                                    setError("Too many requests, try again later")
                                    console.log("Too many requests, try again later")
                                }else{
                                    //If another error than 429 is catched exits the loop
                                    apiCall2 = false;  
                                }
                            }

                            m++;
                            //Runs three times because that's the number of keys that we have
                        } while(apiCall2 && m<apiLength);
                }
                //sets matchesByLeague in the useStete in order to display it in the web page
                setTeamMatches(matchesByLeagues);
                setLoading(false);
            }
            fetchData();

        } else if (query.state){
            //If the state has come but there was no matches fot the team queried
            setError("There were no matches for those Clubs")
        }
    },[query.state,team1,team2,apiLength]);
    console.log(teamMatches);

    if (error) {
        //If there is an error, redirects to home page and sends the error to be displayed
        history('/', {state: error});
    } else if(loading){
        //Id the API call hasn't arrived yet renders Loading...
        return (
            <>
                <Navbar />
                
                <div className='team-displayed'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}
                    <div className='team-container'>
                        <h1>Loading...</h1>
                    </div>
                </div>

                <Footer />

            </>
        )
    } else {
        return (
            <>
                <Navbar />

                <div className='team-displayed'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}
                    <div className='team-container'>
                        {/* <h1>{query.state}</h1>
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

                        } */}
                    </div>
                </div>

                <Footer />

            </>
        )
    }


};



export default MatchDisplayed;