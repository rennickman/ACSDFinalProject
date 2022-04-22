import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

import { mapAPIs } from '../../apiKeys';
import { footballApi3, config, config1, config2 } from '../../apiKeys';
import Sidebar from '../../components/Sidebar/Sidebar';
import CurrentGameWeek from '../../components/Game Week Comps/CurrentGameWeek';

function GameWeekMatches({ username, favouriteTeam }) {


  //Game Week Counters
  const [matchDayCounter, setMatchDayCounter] = useState("")
  const [matchDayCounterGermany, setMatchDayCounterGermany] = useState("")
  const [matchDayCounterChampionship, setMatchDayCounterChampionship] = useState("")

  //Leagues states
  const [plMatches, setPlMatches] = useState([]);
  const [saMatches, setSaMatches] = useState([]);
  const [fl1Matches, setFl1Matches] = useState([]);
  const [bl1Matches, setBl1Matches] = useState([]);
  const [elcMatches, setElcMatches] = useState([]);
  const [pdMatches, setPdMatches] = useState([]);

  // Value being searched for in search bar
  const [loading, setLoading] = useState(true);

  //Length of the mapAPIs
  const apiLength = Object.keys(mapAPIs).length

  // React-router-dom Method for pushing to different page
  const history = useNavigate()
  
  //Error for Home page
  const [error, setError] = useState("");

  const fetchCurrentGameWeek = async () => {
            //Makes API calls to different token keys untill one is successful
            var apiCall = false;
            var i = 0;
            do{
                try{
            //fetching data
            const getPL = await axios.get("http://api.football-data.org/v2/competitions/" + "PL" + "/matches?matchday=" + `${matchDayCounter}`, {headers:{"X-Auth-Token": mapAPIs[i].token}} )
            const getSA = await axios.get("http://api.football-data.org/v2/competitions/" + "SA" + "/matches?matchday=" +`${matchDayCounter}`, {headers:{"X-Auth-Token": mapAPIs[i].token}})
            const getFL1 = await axios.get("http://api.football-data.org/v2/competitions/" + "FL1" + "/matches?matchday=" +`${matchDayCounter}`, {headers:{"X-Auth-Token": mapAPIs[i].token}})
            const getBL1 = await axios.get("http://api.football-data.org/v2/competitions/" + "BL1" + "/matches?matchday=" +`${matchDayCounterGermany}`, {headers:{"X-Auth-Token": mapAPIs[i].token}})
            const getELC = await axios.get("http://api.football-data.org/v2/competitions/" + "ELC" + "/matches?matchday=" +`${matchDayCounterChampionship}`, {headers:{"X-Auth-Token": mapAPIs[i].token}})
            const getPD = await axios.get("http://api.football-data.org/v2/competitions/" + "PD" + "/matches?matchday=" +`${matchDayCounter}`, {headers:{"X-Auth-Token": mapAPIs[i].token}})

            //If the status of the request is ok it stores matches in useState, stops the loop, and displays the data in the webpage
            if(getPL.status ===  200 && getSA.status ===  200 && getFL1.status ===  200 && getBL1.status ===  200 && getELC.status ===  200 && getPD.status ===  200){

               //assigning vars to every league
                axios.all([getPL, getSA, getFL1, getBL1, getELC, getPD]).then(
                axios.spread((...allData) => {
                  const plData = allData[0].data.matches
                  const saData = allData[1].data.matches
                  const fl1Data = allData[2].data.matches
                  const bl1Data = allData[3].data.matches
                  const elcData = allData[4].data.matches
                  const pdData = allData[5].data.matches
      
                  //setting matchday counters
                  const counterForEngItaEspFra = allData[0].data.matches[0].season.currentMatchday
                  setMatchDayCounter(counterForEngItaEspFra)
                  const counterGer = allData[3].data.matches[0].season.currentMatchday
                  setMatchDayCounterGermany(counterGer)
                  const counterELC = allData[4].data.matches[0].season.currentMatchday
                  setMatchDayCounterChampionship(counterELC)

                  //setting league data 
                  setPlMatches(plData)
                  setSaMatches(saData)
                  setFl1Matches(fl1Data)
                  setBl1Matches(bl1Data)
                  setElcMatches(elcData)
                  setPdMatches(pdData)
                  })
                );

                apiCall = false;
                setLoading(false);
            }
        }catch {
            //If it is the third error it redirects to the home page and send the error "Too many requests"
            if (i===apiLength-1){
                setError("Too many requests, try again later")
                console.log("Too many requests, try again later")
            }else{
              //If an error is catched keeps the loop running so it makes another call to another apiKey
              console.log(`There was an error retrieving the data from the API token ${i}`);
              apiCall = true;
              setLoading(true);
            }
        }

        i++;
        //Runs three times because that's the number of keys that we have
    } while(apiCall && i<apiLength);

  } 
 // Function is ran again once the matchday counter is updated to retrieve data for current game week 
  useEffect(() => {
    fetchCurrentGameWeek();
  }, [matchDayCounter])

  //Array for each league
  const AllLeagues = [ plMatches, saMatches, fl1Matches, bl1Matches, elcMatches, pdMatches ] 
  

  //If an error exists redirects to home page and sends the error to be displayed display
  if (error) {
    history('/', {state: error});
  } else if (loading){
      //Renders the page
      return(
          <>  
              <div className='league-displayed'>
                  {username && <Sidebar username={username} favouriteTeam={favouriteTeam} />}
                  <h1>Loading...</h1>
              </div>
          </>
      );
  } else {
      //Renders the data
      return(
          <>  
              <div className='league-displayed'>
                  {username && <Sidebar username={username} favouriteTeam={favouriteTeam} />}
                  <Container>
                    {AllLeagues.map((everyLeague, index) => {
                    return (
                      <Row key={index}>  
                      <h1>Weekly Fixtures</h1> 
                        <Col> 
                        {everyLeague.map((currentGW) => 
                          <Link to={'/match/'} state={currentGW} key={currentGW.id}>
                            <CurrentGameWeek
                              home={currentGW.homeTeam.name}
                              away={currentGW.awayTeam.name}
                              time={currentGW.utcDate} />  
                          </Link>                   
                        )}  
                      </Col>  
                      </Row>
                    ) 
                    })}
                  </Container>
              </div>
          </>
      );
  }
}

export default GameWeekMatches