import React from 'react';
import { Table, Container, Col, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './topGoalScorers.css'
const TopGoalScorer = ({ topScorer }) => {

    return (
         <Container>
         <Table striped bordered hover variant="light" id='top_scorer_table'>
            <tbody>
              <tr>
               <td className='top_scorer_data'> {topScorer.player.name} </td>
               <td className='top_scorer_data'> {topScorer.numberOfGoals} </td>
               <td className='top_scorer_data'> <Link to={'/club/' + topScorer.team.name} state={topScorer.team.name.toLowerCase()}>{topScorer.team.name}</Link> </td>
              </tr>
            </tbody>
            </Table>
         </Container>
             );
        };

export default TopGoalScorer;