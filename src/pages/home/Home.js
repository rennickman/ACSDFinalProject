import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Form, Button} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../firebase';

import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { mapAPIs } from '../../apiKeys';
import TodaysMatches from '../../components/Todays Matches/TodaysMatches';
import Footer from '../../components/Footer/Footer';





const Home = () => {

    // Value being searched for in search bar
    const [LeagueSearchValue, setLeagueSearchValue] = useState("");

    // Value being searched for in search bar
    const [TeamSearchValue, setTeamSearchValue] = useState("");

    // Value being searched for in search bar
    const [loading, setLoading] = useState(true);

    // Value being searched for in search bar
    const [todaysMatches, setTodaysMatches] = useState({});

    // Renders any error that shoud be displayed on the home page
    let error = useLocation();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    // Get current user if logged in
    const currentUser = useAuth();

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
            } while(apiCall && i<3);
        }
        fetchData();
    },[]);

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
            history('/' + TeamSearchValue, {state: TeamSearchValue});
        } else {
            alert("Please type a league");
        }
    }

    //If Data from Today's matches is not ready renders Loading...:
    if(loading){
        return (
            <>
                <Navbar />

                <div className='home'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}

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
                                        <Form.Label>League</Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setLeagueSearchValue(e.target.value.toLowerCase())}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleleLeagueSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="match" title="Match">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Match</Form.Label>
                                        <Form.Control type="text" placeholder="Type first team here" />
                                        <Form.Control type="text" placeholder="Type second team here" />
                                    </Form.Group>
                                    <Button variant="primary" disabled>
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="team" title="Team">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Team</Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setTeamSearchValue(e.target.value.toLowerCase())}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleTeamSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            </Tabs>
                        </div>
                        <div>
                            <h1>Loading Today's Matches...</h1>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
            
        );
    //If Data from Today's matches is ready renders the matches:
    } else {
        return (
            <>  
                <Navbar />

                <div className='home'>
                    {currentUser && <Sidebar userUid={currentUser.uid} />}

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
                                        <Form.Label>League</Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setLeagueSearchValue(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleleLeagueSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="match" title="Match">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Match</Form.Label>
                                        <Form.Control type="text" placeholder="Type first team here" />
                                        <Form.Control type="text" placeholder="Type second team here" />
                                    </Form.Group>
                                    <Button variant="primary" disabled>
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="team" title="Team">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Team</Form.Label>
                                        <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setTeamSearchValue(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="success" type="submit" onClick={handleTeamSubmit} >
                                        Go
                                    </Button>
                                </Form>
                            </Tab>
                            </Tabs>
                        </div>
                        <div>
                            <h1>Today's Matches</h1>
                            {todaysMatches.data.matches.map((match, index) => 
                                <TodaysMatches match={match} index={index}/>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }
};



export default Home;