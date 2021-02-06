import React from 'react';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartAction from '../../actions/cartActions';

import './ShopCart.css';

function ListItem(props){

  
  function clickPlus(e){
    e.preventDefault();
    props.addItem( props.all, props.item);
  }
  function clickMinus(e){
    e.preventDefault();
    if (props.item.quantity>0){
      props.removeItem( props.all, props.item);
    }
  }
  function delItem(e){
    e.preventDefault();
    props.deleteItem( props.all, props.item);
  }
  return(
    <div className="itemCart">
        <img className="imgCart" src={require(`../../${props.item.product.imageURL}`).default} alt="Imagem Item" />
        <div className="prodInfoCart">
            <p className="prodNameCart">{props.item.product.name}</p>
            <p className="prodContentCart">{props.item.product.content}</p>
            <p className="priceItemCart">R$ {props.item.product.currentPrice}</p>
        </div>
        <div className="quantitySet">
        <button type="button" className="del-item" onClick={delItem}>
          <img id={props.item.product.productID} src={require("../../images/iconmonstr-trash-can-2.svg").default}/>
        </button>
        <div className="numItensCart">
          <button type="button" id={`btn-minus-${props.item.product.productID}`} name="minus" value="sub" className="minus button-qtd" onClick={clickMinus}>-</button>

          <div className="prod-quantity-input">{props.item.quantity}</div>
          
          <button type="button" id={`btn-plus-${props.item.product.productID}`} name="plus" value="add" className="plus button-qtd" onClick={clickPlus}>+</button>
        </div>
        </div>
        <div className="totalPriceItemCart">R$ {(Math.round(props.item.quantity * props.item.product.currentPrice * 100) / 100).toFixed(2)}</div>
        
    </div>
  )
}

function ShopCart(props){
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
       
          {props.itemsCart.itemsCart[0]['quantity'] !=0 &&
             props.itemsCart.itemsCart.map(item =>
              <ListItem 
                key={item.product.productID} 
                all={props.itemsCart.itemsCart} 
                item={item} 
                addItem={props.addItem} 
                removeItem={props.removeItem}
                deleteItem={props.deleteItem}
              />    
              ) 
          }          
      
      </div>
      
            {
            props.itemsCart.itemsCart &&
           
            <footer id="totalCart">
              <div className="infoTotalCart">
                <div>
                    <p>Items: </p>
                    <p>{props.itemsCart.itemsCart.reduce((cont, item)=> cont+=item["quantity"],0)}</p>
                </div>
                <div>
                    <p>Total: </p>
                    <p>R$ {
                      props.itemsCart.itemsCart[0].quantity > 0 
                      ? (Math.round(props.itemsCart.itemsCart.reduce((total, item)=>
                         total+=item["quantity"]*item.product['currentPrice'],0) * 100) / 100).toFixed(2)
                      : 0.00.toFixed(2)
                      }</p>
                </div>
              </div>
              <button id="checkout" onClick={clickToOrder}>Finalizar</button>
            </footer>
          }
                  
      
      
    </section>
  }</div>
  );
}

const mapStateToProps = state =>({
  itemsCart: state.itemsCart
})
const mapDispatchToProps = (dispatch) => 
      bindActionCreators(CartAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)