import React from 'react'
import { Link } from 'react-scroll'
import './LeagueMatches.css'
function Scroller() {
  return(
    <div>
      <Link to="allMatches" containerId="allMatches" smooth={true} duration={250}><div>top</div></Link> 
      <Link to="allMatches" containerId="allMatches" smooth={true} offset={100000} duration={250}><div>bottom</div></Link> 
    </div>
  )
 }
export default Scroller;