import React from 'react';
import {Link} from 'react-router-dom'

const TopGoalScorer = ({ topScorer }) => {

    return (
        <div className='topGSs'>  
                <p>Name : {topScorer.player.name} || Goals : {topScorer.numberOfGoals} || Club : <Link to={'/club/' + topScorer.team.name} state={topScorer.team.name.toLowerCase()}>{topScorer.team.name}</Link></p>
        </div>
    );
};

export default TopGoalScorer;