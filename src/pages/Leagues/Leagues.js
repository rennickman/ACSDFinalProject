import {Link} from 'react-router-dom';
import './leagues.css';
import Navbar from '../../components/Navbar/Navbar';
import { mapLeagues } from '../../helperFunctions';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuth } from '../../firebase';

const LeaguesList = () => {


    // Get current user if logged in
    const currentUser = useAuth();



    return (
        <>
            <Navbar />
            
            <div className='leagues'>
                {currentUser && <Sidebar userUid={currentUser.uid} />}

                <div className="leaguesContainer">
                    <div className='content' >
                        <div className='leagues-title' >
                            <h1>Leagues</h1>
                            <h3>SEASON 2021-2021</h3>
                        </div>
                    </div>

                    <div className='leagues-list' >
                        {
                            mapLeagues.map((i, index) => {
                                return (
                                    <Link to={'/leagues/' + i.name} state={i.name} className="link" key={index}>
                                        <div className="card-style">
                                            <div className="card-body-style" >
                                                <div>
                                                    <img src={i.logo} className="card-child" alt={i.name + ' logo'}></img>
                                                </div>
                                                <div>
                                                    <div className="card-child" >{i.name}</div >
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
                
        </>
    );
};

export default LeaguesList;