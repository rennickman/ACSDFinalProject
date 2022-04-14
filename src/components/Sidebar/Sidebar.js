import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './sidebar.css';
import { database, ref,  } from '../../firebase';
import { onValue } from 'firebase/database';
import { footballApi } from '../../apiKeys';
import { findClubId } from '../../helperFunctions';


const Sidebar = ({ userUid }) => {

    const [username, setUsername] = useState();
    const [favouriteTeam, setFavouriteTeam] = useState();



    const fetchTeamInfo = async (club) => {

        // Find the club Id
        const clubId = findClubId(club);

        // Fetch Team Infomation
        const data = await axios.get(footballApi.link + "/teams/" + clubId,
            { headers: { "X-Auth-Token": footballApi.token } }); 
        
        setFavouriteTeam(data.data);
    }



    // Fetch User Info from Database when component is rendered
    useEffect(() => {
        // Database reference
        const userInfoRef = ref(database, 'users/' + userUid);

        // Take snapshop of database and store User info in state
        onValue(userInfoRef, snapshot => {
            const data = snapshot.val();
            setUsername(data.username);
            fetchTeamInfo(data.favouriteTeam);
        });
    }, [userUid]);



    

    



    
    return (
        <div className='sidebar'>
            <div className="sidebarContainer">
                <div className="welcome">
                    <h4>Welcome {username}</h4>
                </div>


                {/* Club Crest */}
                <div className="crestContainer">
                    <img className='crest' src={favouriteTeam?.crestUrl} alt="club crest" />
                </div>

                {/* Club Name */}
                <div className="clubName">
                    <p>{favouriteTeam?.name}</p>
                </div>

                {/* Next Game */}


                {/* Stats */}


                {/* Last 5 Games */}


                {/* Table */}

            </div>
        </div>
    );
    
    
};

export default Sidebar;