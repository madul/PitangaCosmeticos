import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";


import * as CartAction from '../../actions/cartActions';

import './BuyPage.css';

function ItemProduct(props){
  let[change,setChange] = useState(false)

  function alterQuantity(e){
    e.preventDefault();
    setChange(change?false:true)
    props.alterQItem(props.all,props.item,e.target.value)
  }
  function delItem(e){
    e.preventDefault();
    props.deleteItem(props.all,props.item);
  }
  return(
    <Form.Row className="prod-form-order">
          <div className="wrapp-btn-del">
          <input type="hidden" name={`price-${props.item.product.productID}`} value={props.item.product.currentPrice}/>
          <button type="button" className="del-item" onClick={delItem}>
            <img id={props.item.product.productID} src={require("../../images/iconmonstr-trash-can-2.svg").default}/>
          </button>
          </div>
          <input 
            id="qtd-prod-product-" 
            type="number" 
            name={`product-${props.item.product.productID}`}
            defaultValue={props.item.quantity}
            onChange={alterQuantity}
            min="0" 
          />
          <Form.Label as={Col} className="order-form-label">
          <img className="img-buy-form" src={require(`../../${props.item.product.imageURL}`).default} alt={`product-${props.item.product.name}`} />
            <p>{props.item.product.name} </p>
            <p>-</p>
            <p>R${props.item.product.currentPrice}</p>
            <p>-</p>
            <p>R${(Math.round(props.item.product.currentPrice * props.item.quantity * 100) / 100).toFixed(2)}</p>
          </Form.Label>
        </Form.Row>
    )
}

function BuyPage(props){
  const user = props.user;
  const history = useHistory();

  console.log("BUY PAGE: ", props)
  useEffect(() => {
    props.show(false)
    return() => {
      props.show(true)
    }
  })

  function sendToBack(e, actualList){
    e.preventDefault();
    fetch("http://localhost:3001/place-order", 
    { method: "POST", 
      body: new FormData(e.target) 
    })
    .then(response => response.json())
    .then(result => {       
      if(result.status){        
        props.discardCart()
        alert(result.message);
        history.push('/')
      }
      else{
        alert(result.message);
      }
    });
  } 
  return(
    <main>
      <h1 className='sectionTitle'>Faça seu pedido</h1>
      
      <section>

          <div id="orderDoc">
            
            <div id="orderModule">
              <p>Preencha o formulário abaixo para realizar seu pedido dos produtos Pitanga</p>
              <br/><br/>
              <Form id="form-order" onSubmit={(event) => sendToBack(event, props.itemsCart.itemsCart)} >
              <input type="hidden" id="clientId" name="clientId" value={user.user._id}/>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label >Nome</Form.Label>
                  <Form.Control defaultValue={user.user.name} id="name"name="name" placeholder="Nome"/>
                </Form.Group>
                
                <Form.Group as={Col}>
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control defaultValue={user.user.surname}name="surname" placeholder="Sobrenome"/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control defaultValue={user.user.email}name="email" type="email" placeholder="Email"/>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>CPF</Form.Label>
                  <Form.Control defaultValue={user.user.cpf}name="cpf" type="number"/>
                </Form.Group>
              </Form.Row>
              
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>CEP</Form.Label>
                  <Form.Control defaultValue={user.user.zipCode} name="zipCode" type="number"/>
                </Form.Group>
                <Form.Group as={Col} xs={1}>
                  <Form.Label>UF</Form.Label>
                  <Form.Control defaultValue={user.user.state} name="state" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control defaultValue={user.user.city} name="city" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control defaultValue={user.user.address} name="address"/>
                </Form.Group>
                <Form.Group as={Col} xs={2}>
                  <Form.Label>Número</Form.Label>
                  <Form.Control defaultValue={user.user.addressNumber} name="address-number" type="number" />
                </Form.Group>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>Complemento</Form.Label>
                  <Form.Control defaultValue={user.user.addressCompl} name="compl" />
                </Form.Group>
              </Form.Row>
            
              <br/>
              <p>Lista de Produtos</p>
              <br/><br/>
              
                { props.itemsCart.itemsCart[0]['quantity'] !=0 &&
                  props.itemsCart.itemsCart.map(item =>
                  <ItemProduct 
                    key={item.product.productID}  
                    item={item} 
                    all={props.itemsCart.itemsCart}
                    deleteItem={props.deleteItem}
                    alterQItem={props.alterQItem}
                  />
                )
                }
              
              </Form>
              
              <div id="totalPriceContainer">
                <p>Total: </p>
                <p id="totalPriceOrder">R$
                
                {props.itemsCart.itemsCart[0].quantity > 0 
                  ? (Math.round(props.itemsCart.itemsCart.reduce((total, item)=>
                      total+=item["quantity"]*item.product['currentPrice'],0) * 100) / 100).toFixed(2)
                  : 0.00.toFixed(2)}
                  </p>
              </div>
              
              <button className="submit-order" type="submit" form="form-order">Realizar Pedido</button>
            </div>

            <div id="orderPlaced"></div>
          </div>
      </section>
    </main>
  );
}

const mapStateToProps = state =>({
  user: state.user,
  itemsCart: state.itemsCart
})
const mapDispatchToProps = (dispatch) => 
      bindActionCreators(CartAction, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(BuyPage)