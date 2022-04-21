import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import LeaguesList from './pages/Leagues/Leagues';
import LeagueDisplayed from './pages/League Displayed/LeagueDisplayed';
import TeamDisplayed from './pages/Team Displayed/TeamDisplayed';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Odds from './pages/OddsPages/Odds';
import OddsLeaguesDisplayed from './pages/OddsPages/OddsLeaguesDisplayed';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useAuth } from './firebase';

function App() {

    // Get current user if logged in
    const currentUser = useAuth();


    return (

        <Router>
            <Navbar />
            
            <Routes>
                {/* Home Route */}
                <Route path="/" exact element={<Home userUid={currentUser?.uid} />} />

                {/* Leagues Route */}
                <Route path="/leagues" exact element={<LeaguesList userUid={currentUser?.uid} />} />

                {/* League Displayed Route */}
                <Route path="/leagues/:name" exact element={<LeagueDisplayed userUid={currentUser?.uid} />} />

                {/* Tean Displayed Route */}
                <Route path="/:name" exact element={<TeamDisplayed />} />

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
