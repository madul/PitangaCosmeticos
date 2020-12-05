import React from 'react';
import { useContext, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Login from '../Login/Login';
import {UserContext} from "../Contexts/userContext";

import './header.css';


function Header (){
  const user = useContext(UserContext);
  const [username,setUserName] = useState("");

  

  return(
    <Navbar className="navbar" expand='sm'>
      <Navbar.Brand as={Link} to="/">
        <img id="logo" src={require(`../images/pitanga2_logo_dark_menu.png`).default} alt="Pitanga logo"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} className="navbar-link" to="/products" >Produtos</Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/stores">Lojas</Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/contacts">Contatos</Nav.Link>
          <NavDropdown title={username != "" ? username:'Login' }>
            {username == "" &&
              <div className="show">
                <Login changeName={setUserName}/>
              </div>
            }
            {username &&
            <>
              <NavDropdown.Item href="/">Sair</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/myOrders">Meus Pedidos</NavDropdown.Item>
            </>
            }
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
}

export default Header;
