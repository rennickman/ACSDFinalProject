import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { OddsApi1 } from '../../apiKeys';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import OddsResults from '../../components/Odds Comps/OddsResults';
import Odds from './Odds';
import { format } from 'date-fns'
function OddsLeaguesDisplayed() {
  //UseStates used
  const [odds, setOdds] = useState([]);
  const [loading, setLoading] = useState(false);

  //Determining the which league to display for API from pathname
  let path = (`${window.location.pathname}`)
  let oddsCode = path.substring(6, path.length)
 
  //Fetching Data
  const fetchOddsData = async () => {
    const getOdds = await axios.get(OddsApi1.link1 + oddsCode + OddsApi1.link2 + OddsApi1.token3 + OddsApi1.link4);
    const results = getOdds.data
    setOdds(results);
    setLoading(true);
    console.log(results);
  }
  useEffect(() => {
    fetchOddsData();
  }, [oddsCode])
  //test 
  //Date Format
  const dateFormatting = () => {
    const dateTest = '2022-04-17T13:15:00Z'; 
  const letSee = format(new Date(dateTest), 'k.m dd-MM-yyyy')
  console.log(dateTest)
  console.log(letSee)
    
  }

useEffect(() => {
  dateFormatting();
}, [])
  return (
    <div>
      <Navbar/>
      {
        loading && 
        odds.map((odd, index) => 
          <OddsResults key={index}
            home_team={odd.bookmakers[0].markets[0].outcomes[0].name}
            away_team={odd.bookmakers[0].markets[0].outcomes[1].name}
            home_team_odds={odd.bookmakers[0].markets[0].outcomes[0].price}
            away_team_odds={odd.bookmakers[0].markets[0].outcomes[1].price}
            draw={odd.bookmakers[0].markets[0].outcomes[2].price}
            title={odd.bookmakers[0].title}
            date={odd.commence_time}
            competitionName={odd.sport_title}
            />
        )}
        <Footer/>
    </div>
  );
} 

export default OddsLeaguesDisplayed