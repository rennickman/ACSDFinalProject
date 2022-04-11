import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/home/Home';
import LeaguesList from './pages/Leagues List/LeaguesList';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home Route */}
                <Route path="/" exact element={<Home />} />

                {/* Home Route */}
                <Route path="/leagueslist" exact element={<LeaguesList />} />

                {/* Login Route */}
                <Route path="/login" element={<Login />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
