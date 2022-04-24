import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Form, Button} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading';


import './home.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mapAPIs } from '../../apiKeys';
import TodaysMatches from '../../components/Todays Matches/TodaysMatches';





const Home = ({ username, favouriteTeam, favouriteLeague, favouriteFixtures }) => {

    // Value for league search bar
    const [LeagueSearchValue, setLeagueSearchValue] = useState("");

    // Value for Team search bar
    const [TeamSearchValue, setTeamSearchValue] = useState("");

    // Value for Team 1 in match search bar
    const [Team1SearchValue, setTeam1SearchValue] = useState("");

    // Value for 
    const [Team2SearchValue, setTeam2SearchValue] = useState("");

    // Value being searched for in search bar
    const [loading, setLoading] = useState(true);

    // Value being searched for in search bar
    const [todaysMatches, setTodaysMatches] = useState({});

    // Renders any error that shoud be displayed on the home page
    let error = useLocation();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    

    //Length of the mapAPIs
    const apiLength = Object.keys(mapAPIs).length

    //Renders the error if there is any
    if(error.state){
        alert(error.state);
        error.state = "";
    }

    //Gets today's matches
    useEffect(() => {
        async function fetchData() {
            //Makes API calls to different token keys untill one is successful
            var apiCall = false;
            var i = 0;
            do{
                try{
                    //Fetches the data from the API where i is the API in apiKeys' array
                    const getTodaysMatches = await axios.get(mapAPIs[i].link + "/matches",
                    { headers: { "X-Auth-Token": mapAPIs[i].token } });
                    //If the status of the request is ok it stores matches in useState, stops the loop, and displays the data in the webpage
                    if(getTodaysMatches.status ===  200){
                        setTodaysMatches(getTodaysMatches);
                        console.log(getTodaysMatches)
                        apiCall = false;
                        setLoading(false);
                    }
                }catch {
                    //If an error is catched keeps the loop running so it makes another call to another apiKey
                    console.log(`There was an error retrieving the data from the API token ${i}`);
                    apiCall = true;
                    setLoading(true);
                }

                i++;
                //Runs three times because that's the number of keys that we have
            } while(apiCall && i<apiLength);
        }
        fetchData();
    },[apiLength]);

    //Handles a sumission for the league tab
    const handleleLeagueSubmit = (e) => {
        e.preventDefault();
        if(LeagueSearchValue){
            //Sends the search value to the LeagueDIsplayed page to make the API call by 'state'
            history('/leagues/' + LeagueSearchValue, {state: LeagueSearchValue});
        } else {
            alert("Please type a league");
        }
    }

    //Handles a sumission for the team tab
    const handleTeamSubmit = (e) => {
        e.preventDefault();
        if(TeamSearchValue){
            //Sends the search value to the LeagueDIsplayed page to make the API call by 'state'
            history('/club/' + TeamSearchValue, {state: TeamSearchValue});
        } else {
            alert("Please type a league");
        }
    }

    //Handles a sumission for the match tab
    const handleMatchSubmit = (e) => {
        e.preventDefault();
        if(Team1SearchValue && Team2SearchValue){
            //Sends the search value to the LeagueDIsplayed page to make the API call by 'state'
            history('/matchsearch/', {state: {team1: Team1SearchValue, team2: Team2SearchValue}});
        } else {
            alert("Please type a league");
        }
    }

    //If Data from Today's matches is not ready renders Loading...:
    if(loading){
        return (
            <>
                <div className='home'>
                    {username && (
                        <Sidebar username={username} favouriteTeam={favouriteTeam}
                            favouriteFixtures={favouriteFixtures} favouriteLeague={favouriteLeague} />
                    )}

                    <div className='home-content'>
                        <div className='home-hero'>
                            <div className='home-img'>
                                <img src="gods-hand.jpg" alt="God's hand"></img>
                            </div>
                        </div>
                        <div className='home-search-window'>
                            <Tabs defaultActiveKey="league" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="league" title="League">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by League</b></Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setLeagueSearchValue(e.target.value.toLowerCase())}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleleLeagueSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="team" title="Team">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by Club</b></Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type club name here" onChange={e => setTeamSearchValue(e.target.value.toLowerCase())}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleTeamSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="match" title="Match">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by Match</b></Form.Label>
                                        <Form.Control type="text" placeholder="Type first club here" onChange={e => setTeam1SearchValue(e.target.value.toLowerCase())} />
                                        <Form.Control type="text" placeholder="Type second club here" onChange={e => setTeam2SearchValue(e.target.value.toLowerCase())} />
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleMatchSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>

                            </Tabs>
                        </div>
                        <div className='loadingContainer'>
                            <ReactLoading type="bars" color="#1c2237"/>
                        </div>
                    </div>
                </div>

            </>
            
        );
    //If Data from Today's matches is ready renders the matches:
    } else {
        return (
            <>  
                <div className='home'>
                    {username && (
                        <Sidebar username={username} favouriteTeam={favouriteTeam}
                            favouriteFixtures={favouriteFixtures} favouriteLeague={favouriteLeague} />
                    )}

                    <div className='home-content'>
                            <div className='home-hero'>
                                <div className='home-img'>
                                    <img src="gods-hand.jpg" alt="God's hand"></img>
                                </div>
                            </div>
                        <div className='home-search-window'>
                            <Tabs defaultActiveKey="league" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="league" title="League">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by League</b></Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setLeagueSearchValue(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleleLeagueSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="team" title="Team">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by Team</b></Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setTeamSearchValue(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleTeamSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="match" title="Match">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><b>Search by Match</b></Form.Label>
                                        <Form.Control type="text" placeholder="Type first club here" onChange={e => setTeam1SearchValue(e.target.value.toLowerCase())} />
                                        <Form.Control type="text" placeholder="Type second club here" onChange={e => setTeam2SearchValue(e.target.value.toLowerCase())} />
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleMatchSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            </Tabs>
                        </div>
                        <div className='todaysMatchesContainer'>
                            <h1 id='today_matches_title'>Today's Matches</h1>
                            {todaysMatches.data.matches.map((match, index) => 
                                <TodaysMatches match={match} key={index}/>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
};



export default Home;