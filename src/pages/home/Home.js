import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Form, Button, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import './home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { footballApi1 } from '../../apiKeys';




const Home = () => {

    // Value being searched for in search bar
    const [searchValue, setSearchValue] = useState("");

    // Value being searched for in search bar
    const [loading, setLoading] = useState(true);

    // Value being searched for in search bar
    const [todaysMatches, setTodaysMatches] = useState({});

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    //Gets today's matches
    useEffect(() => {
        async function fetchData() {
            try {
                const getTodaysMatches = await axios.get(footballApi1.link + "/matches",
                { headers: { "X-Auth-Token": footballApi1.token } });
                setTodaysMatches(getTodaysMatches);
                setLoading(false);
            } catch {
                // Throw an alert if there were any problems retrieving data from the API
                console.log("There was a problem retrieving data for Today's matches");
            }
        }
        fetchData();
    },[todaysMatches]);

    //Handles a sumission for the league tab
    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchValue){
            //Sends the search value to the LeagueDIsplayed page to make the API call by 'state'
            history('/leagues/' + searchValue, {state: searchValue});
        } else {
            alert("Please type a league");
        }
    }
    
    //If Data from Today's matches is not ready renders Loading...:
    if(loading){
        return (
            <div className='home'>
                <Navbar />
                <div className='home-content'>
                    <div className='home-img'>
                        <img src="gods-hand.jpg" alt="God's hand"></img>
                    </div>
                    <div className='home-search-window'>
                        <Tabs defaultActiveKey="league" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="league" title="League">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>League</Form.Label>
                                    <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setSearchValue(e.target.value)}/>
                                </Form.Group>
                                <Button variant="success" type="submit" onClick={handleSubmit} >
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
                                    <Form.Control type="text" placeholder="Type league name here" />
                                </Form.Group>
                                <Button variant="primary" disabled>
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
                <Footer/>
            </div>
            
        );
    //If Data from Today's matches is ready renders the matches:
    } else {
        return (
            <div className='home'>
                <Navbar />
                <div className='home-content'>
                    <div className='home-img'>
                        <img src="gods-hand.jpg" alt="God's hand"></img>
                    </div>
                    <div className='home-search-window'>
                        <Tabs defaultActiveKey="league" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="league" title="League">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>League</Form.Label>
                                    <Form.Control type="text" name="league" placeholder="Type league name here" onChange={e => setSearchValue(e.target.value)}/>
                                </Form.Group>
                                <Button variant="success" type="submit" onClick={handleSubmit} >
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
                                    <Form.Control type="text" placeholder="Type league name here" />
                                </Form.Group>
                                <Button variant="primary" disabled>
                                    Go
                                </Button>
                            </Form>
                        </Tab>
                        </Tabs>
                    </div>
                    <div>
                        <h1>Today's Matches</h1>
                        {todaysMatches.data.matches.map((match, index) => 
                            <div key={index}>
                                <h3>{match.competition.name}</h3>
                                <Row>
                                    <Col>
                                        <h5>Status: {match.status + " " + new Date(match.utcDate)}.</h5>
                                    </Col>
                                    <Col>
                                        <h5>{match.homeTeam.name}</h5>
                                    </Col>
                                    <Col>
                                        <p>
                                            {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
                                        </p>
                                    </Col>
                                    <Col>
                                        <h5>{match.awayTeam.name}</h5>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>
                </div>
                <Footer/>
            </div>
            
        );
    }
};



export default Home;