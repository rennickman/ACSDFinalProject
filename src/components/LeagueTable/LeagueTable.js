import React from 'react';
import {Link} from 'react-router-dom'

import './leagueTable.css';





const LeagueTable = ({ standings }) => {


    return (
        <div className='leagueTable'>
            <table className='table'>
                <tr>
                    <th scope="col">Club</th>
                    <th scope='col'>GP</th>
                    <th scope='col'>W</th>
                    <th scope='col'>D</th>
                    <th scope='col'>L</th>
                    <th scope='col'>GF</th>
                    <th scope='col'>GA</th>
                    <th scope='col'>GD</th>
                    <th scope='col'>Pts</th>
                </tr>
                
                {standings.map((team, index) => (
                    <tr>
                        <th scope="row"><Link to={'/club/' + team.team.name} state={team.team.name.toLowerCase()}>{team.team.name}</Link></th>
                        <td>{team.playedGames}</td>
                        <td>{team.won}</td>
                        <td>{team.draw}</td>
                        <td>{team.lost}</td>
                        <td>{team.goalsFor}</td>
                        <td>{team.goalsAgainst}</td>
                        <td>{team.goalDifference}</td>
                        <td>{team.points}</td>
                    </tr>
                ))}
                
            </table>
        </div>
    );
};


export default LeagueTable;