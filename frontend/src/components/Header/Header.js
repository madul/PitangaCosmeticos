import React from 'react';
import { useState, lazy, Suspense } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Login from '../Login/Login';

import './header.css';

const LogoHeader = lazy(()=> import('./LogoHeader'));

function Header (){
  const [username,setUserName] = useState("");
  const [token,setToken] = useState("");

  

  return(
    <Navbar className="navbar" expand='sm'>
      <Suspense fallback={<h2>Pitanga</h2>}>
        <LogoHeader />
      </Suspense>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="mr-auto">
          <Nav.Link as={Link} className="navbar-link" to="/products" >Produtos</Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/stores">Lojas</Nav.Link>
          <Nav.Link as={Link} className="navbar-link" to="/contacts">Contatos</Nav.Link>
          <NavDropdown title={username !== "" ? username:'Login' }>
            {username === "" &&
              <div className="show">
                <Login changeName={setUserName} changeToken={setToken}/>
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
