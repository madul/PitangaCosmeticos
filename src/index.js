import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from  './Main/Main';

import {UserContext} from "./Contexts/userContext";

import './index.css';
 

function User (){
  const user = useContext(UserContext);
  console.log(user);
  //console.log(setUser);
  user.setUser = (dados) =>{
    user = dados;
  }
  return(
    <UserContext.Provider value={user}>
        <Header/>
        <Main />
        <Footer/>
      </UserContext.Provider>
  )
}

ReactDOM.render(
    <Router>
      <User />
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
