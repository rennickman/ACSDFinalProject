import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/home/Home';
import LeaguesList from './pages/Leagues/Leagues';
import LeagueDisplayed from './pages/League Displayed/LeagueDisplayed';
import TeamDisplayed from './pages/Team Displayed/TeamDisplayed';
import MatchDisplayed from './pages/Match Displayed/MatchDisplayed';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Odds from './pages/OddsPages/Odds';
import OddsLeaguesDisplayed from './pages/OddsPages/OddsLeaguesDisplayed';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useAuth, database, ref, onValue } from './firebase';
import { footballApi } from './apiKeys';
import { findClubId } from './helperFunctions';




function App() {

    // Get current user if logged in
    const currentUser = useAuth();

    const [username, setUsername] = useState();
    const [favouriteTeam, setFavouriteTeam] = useState();


    const fetchTeamInfo = async (club) => {

        // Find the club Id
        const clubId = findClubId(club);

        // Fetch Team Infomation
        const data = await axios.get(footballApi.link + "/teams/" + clubId,
            { headers: { "X-Auth-Token": footballApi.token } });
        // Store in state 
        setFavouriteTeam(data.data);
    }



    // Fetch User Info from Database when component is rendered
    useEffect(() => {
        if (currentUser) {
            // Database reference
            const userInfoRef = ref(database, 'users/' + currentUser.uid);

            // Take snapshop of database and store User info in state
            onValue(userInfoRef, snapshot => {
                const data = snapshot.val();
                // Store username in state
                setUsername(data.username);
                // Fetch data about favourite team
                fetchTeamInfo(data.favouriteTeam);
            });
        }
    }, [currentUser]);



    return (

        <Router>
            <Navbar />
            
            <Routes>
                {/* Home Route */}
                <Route path="/" exact element={<Home username={username} favouriteTeam={favouriteTeam} />} />

                {/* Leagues Route */}
                <Route path="/leagues" exact element={<LeaguesList username={username} favouriteTeam={favouriteTeam} />} />

                {/* League Displayed Route */}
                <Route path="/leagues/:name" exact element={<LeagueDisplayed username={username} favouriteTeam={favouriteTeam} />} />

                {/* Tean Displayed Route */}
                <Route path="/club/:name" exact element={<TeamDisplayed />} />

                {/* Tean Displayed Route */}
                <Route path="/matchsearch/" exact element={<MatchDisplayed />} />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />

                {/* Odds Route */}
                <Route path="/odds" element={<Odds />} />

                {/* League Displayed Route */}
                <Route path="/odds/:code_link" exact element={<OddsLeaguesDisplayed/>} />
            </Routes>

            <Footer />
        </Router>
    );
};

export default App;
