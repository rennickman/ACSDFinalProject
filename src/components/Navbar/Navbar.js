import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';

import "./navbar.css";
import { useAuth, logOutUser } from '../../firebase';




const Navbar = () => {

    // Get current user if logged in
    const currentUser = useAuth();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()

    // Toggle value for opening and closing mobile menu
    const [toggle, setToggle] = useState(false);

    // Methods for toggling and closing mobile menu
    const handleToggle = () => setToggle(!toggle);
    const handleClose = () => setToggle(false);

    // Method for logging out User
    const handleLogOut = async e => {
        e.preventDefault();

        try {
            // LogOut User - Functionality imported from Firebase.js
            await logOutUser();

        } catch {
            // Throw an alert if there were any problems - NB! fill out more later
            alert("There was a problem");
        }
    };



    
    return (
        <div className='navbar-n'>
            <div className="navbar_wrapper">
                <div className="navbar_container container">

                    {/* Logo Section */}
                    <div className="navbar_logo" onClick={handleClose}>
                        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                            <IoMdFootball className="navbar_icon" />
                            Football App
                        </Link>
                    </div>
                    

                    {/* Icon for toggling the Mobile Menu - hidden unless small screen */}
                    <div className="navbar_toggle" onClick={handleToggle}>
                        {toggle ? <FaTimes className='navbar_toggle_icon1' /> : <FaBars className='navbar_toggle_icon2' />}
                    </div>


                    {/* Search Bar and Links - Put as a list for mobile menu */}
                    <ul className={toggle ? "nav_section active" : "nav_section"}>

                        {/* Home Link */}
                        <li className="link_container" onClick={handleClose}>
                                <Link to="/" className="link">
                                    Home
                                </Link>
                        </li>

                        {/* Live Scores Link */}
                        <li className="link_container" onClick={handleClose}>
                                <Link to="/leagues" className="link">
                                    Leagues
                                </Link>
                        </li>
                        
                        {/* Live Scores Link */}
                        <li className="link_container" onClick={handleClose}>
                            <Link to="/current_game_week_matches" className="link">
                               Current Game Week
                            </Link> 
                        </li>

                        {/* Odds */}
                        <li className="link_container" onClick={handleClose}>
                                 <Link to="/odds" className="link">
                                    Odds
                                </Link>
                        </li>

                        {/* Log In / Log Out Button */}
                        <li onClick={handleClose} className="signup_container">
                            {currentUser ? (
                                <button className="signup_button" onClick={handleLogOut}>
                                    Log Out
                                </button>
                            ) : (
                                <button className="signup_button" onClick={() => history("/login")}>
                                    Log In
                                </button>
                            )}
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;