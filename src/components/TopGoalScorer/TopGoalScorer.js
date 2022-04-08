import React from 'react';

const TopGoalScorer = ({ topScorer }) => {

    return (
        <div className='topGSs'>
            <p>Name : {topScorer.player.name} || Goals : {topScorer.numberOfGoals} || Club : {topScorer.team.name}</p>
        </div>
    );
};

export default TopGoalScorer;