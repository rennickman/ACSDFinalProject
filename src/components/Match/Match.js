import axios from 'axios';
import { format } from 'date-fns';
import {useEffect} from 'react';

import {clubBadgeId} from '../../helperFunctions';

const Match = ({ match, index }) => {
    //Formatting Time
    const gameDate = format(new Date(`${match.utcDate}`), 'dd-MM-yyyy');
    const gameTime = format(new Date(`${match.utcDate}`), 'k.mm');

    //Finds the id for the 1st team img request
    const clubBadgeId1 = Object.values(clubBadgeId).find((competition) => {
        return competition.name.includes(match.homeTeam.name.toLowerCase());
    });

    //Finds the id for the 2nd team img request
    const clubBadgeId2 = Object.values(clubBadgeId).find((competition) => {
        return competition.name.includes(match.awayTeam.name.toLowerCase());
    });

    //Renders the API call
    useEffect(() => {

        async function fetchData(){
            //Retrieves the clubs imgs
            const getHomeTeamImg  = await axios.get(`https://sportteamslogo.com/api?key=9e2c1f1b157241c7b567fc1a60f4d427&size=big&tid=${clubBadgeId1.id}`);
            const getAwayTeamImg  = axios.get(`https://sportteamslogo.com/api?key=9e2c1f1b157241c7b567fc1a60f4d427&size=big&tid=${clubBadgeId2.id}`);
            console.log(getHomeTeamImg);
            console.log(getAwayTeamImg);
        }
        fetchData()

    },[]);


    return (
        <div key={index+20}>
             <div>
                <h5>{gameDate}</h5>
            </div>
            <div>
                <div>
                    <img src={`https://sportteamslogo.com/api?key=9e2c1f1b157241c7b567fc1a60f4d427&size=big&tid=${clubBadgeId1.id}`} alt={match.homeTeam.name + " logo"}></img>
                    <h5>{match.homeTeam.name}</h5>
                </div>
                <div>
                    <p>
                        {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
                    </p>
                </div>
                <div>
                <img src="/api?key=9c2a8f30aff64ce0a9e5a2b4f5827d31&size=big&tid=77889"/>
                    <img src={`https://sportteamslogo.com/api?key=9e2c1f1b157241c7b567fc1a60f4d427&size=big&tid=${clubBadgeId2.id}`} alt={match.awayTeam.name + " logo"}></img>
                    <h5>{match.awayTeam.name}</h5>
                </div>
            </div>
            <div>
                <div><h5>{match.status}</h5></div>
                <div><h5>{gameTime}</h5></div>
            </div>
        </div>
    );
};

export default Match;