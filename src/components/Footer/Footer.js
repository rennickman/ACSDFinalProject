import React from 'react'
import { Container, Navbar, Card, Col, Row } from 'react-bootstrap';
import { IoMdFootball } from 'react-icons/io';
import { Link } from 'react-router-dom';

import './footer.css'
function Footer() {
  return (
    <Card body id='footer_card'>

      {/*Logo and Title*/}
      <Navbar>
        <Container id='footer_header'>
          <Link to="/" className='footer_logo_title'>
            <div id='footer_logo_title_container'>
               <IoMdFootball className="navbar_icon" />
               Football App
            </div>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*Description of app*/}
        <Container>
          <Row>
            <Container id='footer_app_description'>
              <Col> 
                <p>Get all you the latest football scores and stats here!</p>
              </Col>
            </Container>

           {/*Links*/}
           <Col className='footer_links'> 
            <div className='footer_link_container'>
              <Link to="/" className='footer_link_name'> Home </Link>
            </div>   
            <div className='footer_link_container'>
              <Link to="/leagues" className="footer_link_name"> Leagues </Link>
            </div>
           </Col>
           <Col className='footer_links'> 
            <div className='footer_link_container'>
              <Link to="/home" className="footer_link_name"> Live Scores </Link>
            </div> 
            <div className='footer_link_container'>
              <Link to="/leagues" className="footer_link_name"> Standings </Link>
            </div>
           </Col>
           <Col className='footer_links'> 
            <div className='footer_link_container'>
              <Link to="/home" className="footer_link_name"> Top Scorers </Link>
            </div>
            <div className='footer_link_container'>
              <Link to="/leagues" className="footer_link_name"> Log in </Link>
            </div>  
           </Col>
          </Row>
          </Container> 

      {/*Copyright*/}            
      <Container>
       <Row>
         <Col>
         <p id='copyright'>Copyright © 2022 Football App</p>
         </Col>
       </Row>
      </Container>
    </Card>
  );
}

export default Footer