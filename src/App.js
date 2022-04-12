import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import LeaguesList from './pages/Leagues/Leagues';
import LeagueDisplayed from './pages/League Displayed/LeagueDisplayed';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" exact element={<Home />} />

                {/* Leagues Route */}
                <Route path="/leagues" exact element={<LeaguesList />} />

                {/* League Displayed Route */}
                <Route path="/league" exact element={<LeagueDisplayed />} />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
