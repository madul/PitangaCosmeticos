import React from 'react';
import {useState} from 'react';
import {Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from "../Home/Home";
import Stores from "../Stores/Stores";
import Contact from "../Contact/Contact";
import Products from "../Products/Products";
import Login from "../../components/Login/Login";
import BuyPage from "../BuyPage/BuyPage";
import ShopCart from "../../components/ShopCart/ShopCart";
import ShopButton from "../../components/ShopButton/ShopButton";
import MyOrders from "../MyOrders/MyOrders";
import SignUp from "../SignUp/";

import * as CartAction from '../../actions/cartActions';

function Main (){
  const [showList, setShowList] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  return(
    <div>
        
          {showButton && <ShopCart  show={showList} setShowList={setShowList}/>}
          
          {showButton && <ShopButton setShowList={setShowList}/>}
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/products" component={Products} />
            <Route path="/stores" component={Stores} />
            <Route path="/contacts" component={Contact} /> 
            {showLogin && <Route path="/login" render={(props) => <Login {...props} show={setShowLogin}/>} /> }
            <Route path="/myOrders" component={MyOrders} /> 
            <Route path="/buy" render={(props) => <BuyPage {...props} show={setShowButton}/>} />
            <Route path="/cadastrar" component={SignUp} />
            <Route component={Error} />
          </Switch>
    </div>
  );
}

const mapStateToProps = state =>({
  itemsCart: state.itemsCart
})
const mapDispatchToProps = (dispatch) => 
      bindActionCreators(CartAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main)