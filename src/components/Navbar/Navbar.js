import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';

import { findLeagueId } from '../../helperFunctions';
import "./navbar.css";


const Navbar = ({ fetchLeagueTable }) => {

    const [searchValue, setSearchValue] = useState("");


    // Toggle value for opening and closing mobile menu
    const [toggle, setToggle] = useState(false);

    // Methods for toggling and closing mobile menu
    const handleToggle = () => setToggle(!toggle);
    const handleClose = () => setToggle(false);


    // Handle search functionality
    const handleSearch = e => {
        e.preventDefault();
        // Find the leagueId
        const searchId = findLeagueId(searchValue);
        // Fetch the league info and table
        fetchLeagueTable(searchId);
        // Close the mobile menu if opened
        handleClose();
    }



    
    return (
        <div className='navbar'>
            <div className="navbar_wrapper">
                <div className="navbar_container container">

                    {/* Logo Section */}
                    <div className="navbar_logo" onClick={handleClose}>
                        <IoMdFootball className="navbar_icon" />
                        Football App
                    </div>

                    {/* Icon for toggling the Mobile Menu - hidden unless small screen */}
                    <div className="navbar_toggle" onClick={handleToggle}>
                        {toggle ? <FaTimes className='navbar_toggle_icon1' /> : <FaBars className='navbar_toggle_icon2' />}
                    </div>


                    {/* Search Bar and Links - Put as a list for mobile menu */}
                    <ul className={toggle ? "nav_section active" : "nav_section"}>
                        
                        {/* Search Bar - button is hidden to allow submit by pressing enter */}
                        <li className='searchbar_container'>
                            <form>
                                <input
                                    className='searchbar' type="text" placeholder='Search for League' value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                                <button onClick={handleSearch} type='submit' style={{ display: "none" }}></button>
                            </form>
                        </li>

                        {/* Live Scores Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Live Scores
                            </div>
                        </li>

                        {/* Live Standings Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Standings
                            </div>
                        </li>

                        {/* Top Scorers Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Top Scorers
                            </div>
                        </li>


                        {/* Log In / Sign Up button */}
                        <li onClick={handleClose} className="signup_container">
                            <button className="signup_button">
                                Sign up
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;