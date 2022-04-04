import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';

import "./navbar.css";


const Navbar = () => {


    // Toggle value for opening and closing menu
    const [toggle, setToggle] = useState(false);

    // Methods for toggling and closing menu
    const handleToggle = () => setToggle(!toggle);
    const handleClose = () => setToggle(false);



    return (
        <div className='navbar'>
            <div className="navbar_wrapper">
                <div className="navbar_container container">

                    {/* Logo Section */}
                    <div className="navbar_logo" onClick={handleClose}>
                        <IoMdFootball className="navbar_icon" />
                        Football App
                    </div>

                    {/* Icon for toggling the Mobile Menu */}
                    <div className="navbar_toggle" onClick={handleToggle}>
                        {toggle ? <FaTimes className='navbar_toggle_icon1' /> : <FaBars className='navbar_toggle_icon2' />}
                    </div>


                    {/* Search Bar and Links - Put as a list for mobile menu */}
                    <ul className={toggle ? "nav_section active" : "nav_section"}>
                        {/* Search Bar - button is hidden to allow submit by pressing enter */}
                        <li className='searchbar_container'>
                            <form>
                                <input
                                    className='searchbar' type="text" placeholder='Search for League'
                                />
                                <button type='submit' style={{ display: "none" }}></button>
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