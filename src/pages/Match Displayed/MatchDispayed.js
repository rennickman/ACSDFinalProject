import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../firebase';

import './matchdisplayed.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mapAPIs } from '../../apiKeys';
import Match from '../../components/Match/Match';

const MatchDisplayed = ({ username, favouriteTeam, favouriteLeague, favouriteFixtures }) => {

    // Renders useLocation so it takes the league name sent through a League's Link or Home Search bar by 'state'
    const query = useLocation();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    //Error for Home page
    const [error, setError] = useState("");

    // Value being searched for in search bar
    const [loading, setLoading] = useState(true);

    //League Table
    const [match, setMatch] = useState([""]);

    //Length of the mapAPIs
    const apiLength = Object.keys(mapAPIs).length

    // // Fetch Team Fixtures
    // const data2 = await axios.get(sideBarApi.link + "/teams/" + clubId + "/matches/",
    //     { headers: { "X-Auth-Token": sideBarApi.token } });
    // setFavouriteFixtures(data2.data.matches);

    // // Method to find last 5 matches
    // const findLast5Matches = () => {
    //     const results = favouriteFixtures?.filter(match => match.status === "FINISHED");
    //     const last5 = results.slice(-5).reverse();
    //     setLast5Matches(last5);
    // };

    useEffect(() => {
        //If a query came trhought useLocation and a team id was found for that query
        if (query.state) {
            setLoading(false)
            // async function fetchData() {
            //     //Leagues array for all the leagues that the clubs plays in
            //     let matchArray = [];

            //     //Makes API calls to different token keys untill one is successful
            //     let apiCall = false;
            //     var i = 0;
            //     do{
            //         try{
            //             //Fetching the leagues that that the team is involved via API
            //             const getMatch  = await axios.get(mapAPIs[i].link + "matches/" + query.state,
            //             { headers: { "X-Auth-Token": mapAPIs[i].token } });
            //             //If the status of the request is ok it stores matches in useState, stops the loop, and displays the data in the webpage
            //             if(getMatch.status ===  200){
            //                 //Stores in an array the match
            //                 matchArray.push(getMatch);
            //                 //Stops the loop
            //                 apiCall = false;
            //             }
            //         }catch {
            //             //If it is the third error it redirects to the home page and send the error "Too many requests"
            //             if (!matchArray && i===apiLength-1){
            //                 setError("Too many requests, try again later")
            //                 console.log("Too many requests, try again later")
            //             }else{
            //                 //If an error is catched keeps the loop running so it makes another call to another apiKey
            //                 apiCall = true;
            //             }
            //         }

            //         i++;
            //         //Runs three times because that's the number of keys that we have
            //     } while(apiCall && i<apiLength);
            //     //sets matchesByLeague in the useStete in order to display it in the web page
            //     if(matchArray.length){
            //         setMatch(matchArray);
            //         setLoading(false);
            //     }

            // }
            // fetchData();

        } else if (!query.state){
            //If the state has come but there was no matches fot the team queried
            setError("There was an error, Please try again later");
        }
    },[query]);

    if (error) {
        //If there is an error, redirects to home page and sends the error to be displayed
        history('/', {state: error});
    } else if(loading){
        //Id the API call hasn't arrived yet renders Loading...
        return (
            <>
                <div className='match-displayed'>
                    {username && (
                        <Sidebar username={username} favouriteTeam={favouriteTeam}
                            favouriteFixtures={favouriteFixtures} favouriteLeague={favouriteLeague} />
                    )}
                    <div className='match-container'>
                        <h1>Loading...</h1>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='match-displayed'>
                    {username && (
                        <Sidebar username={username} favouriteTeam={favouriteTeam}
                            favouriteFixtures={favouriteFixtures} favouriteLeague={favouriteLeague} />
                    )}
                    <div className='match-container'>
                        <Match match={query.state} />
                    </div>
                </div>
            </>
        )
    }

};



export default MatchDisplayed;