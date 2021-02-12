import React from 'react';
import { Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './header.css';




export default function LogoHeader(){
  return(
    <Navbar.Brand as={Link} to="/">
      <img id="logo" src={require(`../../images/pitanga2_logo_dark_menu.png`).default} alt="Pitanga logo"/>
    </Navbar.Brand>
  )
}