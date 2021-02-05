import React from 'react';
import {useState, useEffect} from 'react';
import {Switch, Route } from "react-router-dom";

import Home from "../Home";
import Stores from "../Stores/Stores";
import Contact from "../Contact/Contact";
import Products from "../Products/Products";
import Login from "../Login/Login";
import BuyPage from "../BuyPage/BuyPage";
import ShopCart from "../ShopCart/ShopCart";
import ShopButton from "../ShopButton/ShopButton";
import MyOrders from "../MyOrders/MyOrders";

import {ShopContext} from "../Contexts/shopContext";

export default function Main (){
  const [items,setItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const [shopList,setShopList] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const alterItemsList = (item, operation)=>{
    console.log(item)
    let indexItem = shopList.map((itemList, index)=>  itemList.productID == item.productID? index:-1)
                            .find((value)=>value >= 0);
    
    let listCopy = [...shopList];

    console.log(shopList)
    if(operation === "delete" && indexItem>=0){
      listCopy.splice(indexItem,1)
      setShopList(listCopy);
    } 
    else if(operation === "add"){
      if(indexItem >=0){
        listCopy[indexItem]["quantity"] +=1;
        setShopList(listCopy);
      } else{
        item["quantity"] = 1;
        setShopList([...shopList, item]);
      }
    } 
    else if(operation === "remove"){
      if(listCopy[indexItem]["quantity"] > 0){
        listCopy[indexItem]["quantity"] -=1;
        setShopList(listCopy);
      }
    }
    else if(operation === "alter"){
      console.log("chegou aqui")
      console.log(item)
      listCopy[indexItem]["quantity"] = item["quantity"];
      setShopList(listCopy);

    }
  }

  const deleteList = () =>{
    setShopList([])
    console.log(shopList)
  }
  return(
    <div>
      <ShopContext.Provider value={[shopList, alterItemsList, deleteList]}>
        
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
            <Route component={Error} />
          </Switch>
      </ShopContext.Provider>
    </div>
  );
}