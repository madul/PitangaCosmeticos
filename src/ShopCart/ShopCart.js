import React from 'react';
import {useState, useEffect } from 'react';

import {ShopContext} from "../Contexts/shopContext";
import {Link, useHistory} from 'react-router-dom';

import './ShopCart.css';

function ListItem(props){
  const [quantity,setQuantity] = useState(props.item.quantity);

  
  function clickPlus(e){
    e.preventDefault();
    setQuantity(quantity + 1);
    props.changeList({"productID": e.target.id.split('btn-plus-')[1]}, "add");
  }
  function clickMinus(e){
    e.preventDefault();
    if (quantity>0){
      setQuantity(quantity - 1);
      console.log(e.target.id.split('btn-minus-')[1]);
      props.changeList({"productID": e.target.id.split('btn-minus-')[1]}, "remove");
    }
  }
  function delItem(e){
    e.preventDefault();
    props.changeList({"productID": e.target.id}, "delete");
    //console.log(props.item.productID)
    //props.changeList()
  }
  return(
    <div className="itemCart">
        <img className="imgCart" src={require(`../${props.item.imageURL}`).default} alt="Imagem Item" />
        <div className="prodInfoCart">
            <p className="prodNameCart">{props.item.name}</p>
            <p className="prodContentCart">{props.item.content}</p>
            <p className="priceItemCart">R$ {props.item.currentPrice}</p>
        </div>
        <div className="quantitySet">
        <button type="button" className="del-item" onClick={delItem}>
          <img id={props.item.productID} src={require("../images/iconmonstr-trash-can-2.svg").default}/>
        </button>
        <div className="numItensCart">
          <button type="button" id={`btn-minus-${props.item.productID}`} name="minus" value="sub" className="minus button-qtd" onClick={clickMinus}>-</button>
          <div className="prod-quantity-input">{quantity}</div>
          <button type="button" id={`btn-plus-${props.item.productID}`} name="plus" value="add" className="plus button-qtd" onClick={clickPlus}>+</button>
        </div>
        </div>
        <div className="totalPriceItemCart">R$ {(Math.round(quantity * props.item.currentPrice * 100) / 100).toFixed(2)}</div>
        
    </div>
  )
}

export default function ShopCart(props){
  const [items,setItems] = useState([]);
  let history = useHistory();

  function eventHandle(e){
    e.preventDefault();
    props.setShowList(false);
  }
  function clickToOrder(e){
    e.preventDefault();
    history.push('./buy');
  }
  
  return(
    <div>
    {props.show &&
    <section id="shopping-list">
      <header id="headerCart">
          <p className="titleCart">Sua Compra</p>
          <button type='button' id="closeCart" onClick={eventHandle}>
            <span aria-hidden="true">&times;</span>
          </button>
      </header>    
      <div className="itemsList">
        <ShopContext.Consumer>
          {(shopList) =>
             shopList[0].map(item =>
              <ListItem key={item.productID} item={item} changeList={shopList[1]}/>    
              ) 
          }          
        </ShopContext.Consumer>
      </div>
      
      <ShopContext.Consumer>
          {(shopList) => {
            
          return(
            <footer id="totalCart">
              <div className="infoTotalCart">
                <div>
                    <p>Items: </p>
                    <p>{shopList[0].reduce((cont, item)=> cont+=item["quantity"],0)}</p>
                </div>
                <div>
                    <p>Total: </p>
                    <p>R$ {(Math.round(shopList[0].reduce((total, item)=> total+=item["quantity"]*item['currentPrice'],0) * 100) / 100).toFixed(2)}</p>
                </div>
              </div>
              <button id="checkout" onClick={clickToOrder}>Finalizar</button>
            </footer>
          )}
        }          
      </ShopContext.Consumer>
      
    </section>
  }</div>
  );
}