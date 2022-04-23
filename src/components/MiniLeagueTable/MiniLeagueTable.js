import React from 'react';

import'./miniLeagueTable.css';


const MiniLeagueTable = ({ standings }) => {

    console.log(standings);


    return (
        
        
        <div className='leagueTable'>
            
                <table className='table' style={{ border: "1px solid black"}}>
                    <tr>
                        <th scope="col">Pos</th>
                        <th scope="col">Club</th>
                        <th scope='col'>GP</th>
                        <th scope='col'>GD</th>
                        <th scope='col'>Pts</th>
                    </tr>

                    {standings.map((team) => (
                        <tr>
                            <td>{team.position}</td>
                            <th scope="row">{team.team.name}</th>
                            <td>{team.playedGames}</td>
                            <td>{team.goalDifference}</td>
                            <th scope="row">{team.points}</th>
                        </tr>
                    ))}

                </table>
        </div>
        
        
    );
};


export default MiniLeagueTable;