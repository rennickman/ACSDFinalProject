import React from 'react';

import './sidebar.css';



const Sidebar = ({ username, favouriteTeam }) => {

    

    
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