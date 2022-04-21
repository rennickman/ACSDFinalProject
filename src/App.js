import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import LeaguesList from './pages/Leagues/Leagues';
import LeagueDisplayed from './pages/League Displayed/LeagueDisplayed';
import TeamDisplayed from './pages/Team Displayed/TeamDisplayed';
import MatchDisplayed from './pages/Match Displayed/MatchDisplayed';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Odds from './pages/OddsPages/Odds';
import OddsLeaguesDisplayed from './pages/OddsPages/OddsLeaguesDisplayed';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" exact element={<Home />} />

                {/* Leagues Route */}
                <Route path="/leagues" exact element={<LeaguesList />} />

                {/* League Displayed Route */}
                <Route path="/leagues/:name" exact element={<LeagueDisplayed />} />

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
        </Router>
    );
};

export default App;
