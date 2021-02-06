import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from  './pages/Main/Main';

import { Store } from './store';

import './index.css';
 

function User (){
  return(
    <Provider store={ Store }>
        <Header/>
        <Main />
        <Footer/>
      </Provider>
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
