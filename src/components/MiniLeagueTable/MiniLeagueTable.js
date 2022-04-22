import React from 'react';

import'./miniLeagueTable.css';


const MiniLeagueTable = ({ standings }) => {

    console.log(standings);


    return (
        
        
        <div className='leagueTable'>
            <table className='table'>
                <tr>
                    <th scope="col">Club</th>
                    <th scope='col'>GP</th>
                    <th scope='col'>GD</th>
                    <th scope='col'>Pts</th>
                </tr>

                {standings.map((team) => (
                    <tr>
                        <th scope="row">{team.team.name}</th>
                        <td>{team.playedGames}</td>
                        <td>{team.goalDifference}</td>
                        <td>{team.points}</td>
                    </tr>
                ))}

            </table>
        </div>
        
        
    );
};


export default MiniLeagueTable;