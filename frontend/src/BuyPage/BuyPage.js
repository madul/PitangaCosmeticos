import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";

import {ShopContext} from "../Contexts/shopContext";
import {UserContext} from "../Contexts/userContext";

import './BuyPage.css';

function ItemProduct(props){
    
  function alterQuantity(e){
    e.preventDefault();
    props.item["quantity"] = e.target.value;
    props.alterItemsList(props.item,"alter")
  }
  function delItem(e){
    e.preventDefault();
    props.alterItemsList({"productID": e.target.id}, "delete");
  }
  return(
    <Form.Row className="prod-form-order">
          <div className="wrapp-btn-del">
          <input type="hidden" name={`price-${props.item.productID}`} value={props.item.currentPrice}/>
          <button type="button" className="del-item" onClick={delItem}>
            <img id={props.item.productID} src={require("../images/iconmonstr-trash-can-2.svg").default}/>
          </button>
          </div>
          <input 
            id="qtd-prod-product-" 
            type="number" 
            name={`product-${props.item.productID}`}
            defaultValue={props.item.quantity}
            onChange={alterQuantity}
            min="0" 
          />
          <Form.Label as={Col} className="order-form-label">
          <img className="img-buy-form" src={require(`../${props.item.imageURL}`).default} alt={`product-${props.item.name}`} />
            <p>{props.item.name} </p>
            <p>-</p>
            <p>R${props.item.currentPrice}</p>
            <p>-</p>
            <p>R${(Math.round(props.item.currentPrice * props.item.quantity * 100) / 100).toFixed(2)}</p>
          </Form.Label>
        </Form.Row>
    )
}

export default function BuyPage(props){
  const user = useContext(UserContext);
  const [shopList,eraseList] = useContext(ShopContext);
  const history = useHistory();

  useEffect(() => {
    props.show(false)
    return() => {
      props.show(true)
    }
  })

  function sendToBack(e, actualList){
    e.preventDefault();
    console.log(e.target)
    console.log(actualList)
    fetch("http://localhost:3001/place-order", 
    { method: "POST", 
      body: new FormData(e.target) 
    })
    .then(response => response.json())
    .then(result => {       
      console.log(result.status)
      if(result.status){
        console.log("Dentro de status")
        
        actualList[2]()
        alert(result.message);
        history.push('/')
        console.log(result)
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
        <ShopContext.Consumer>
          {(shopList) =>{
              return(
            
          <div id="orderDoc">
            
            <div id="orderModule">
              <p>Preencha o formulário abaixo para realizar seu pedido dos produtos Pitanga</p>
              <br/><br/>
              <Form id="form-order" onSubmit={(event) => sendToBack(event, shopList)} >
              <input type="hidden" id="clientId" name="clientId" value={user.user.clientID}/>
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
                  <Form.Control defaultValue={user.user.state} name="uf" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control defaultValue={user.user.city} name="city" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Logradouro</Form.Label>
                  <Form.Control defaultValue={user.user.address} name="logradouro"/>
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
              
                { shopList[0].map(item =>
                  <ItemProduct key={item.productID}  item={item} alterItemsList={shopList[1]}/>
                )
                }
              
              </Form>
              
              <div id="totalPriceContainer">
                <p>Total: </p>
                <p id="totalPriceOrder">R$
                
                {(Math.round(shopList[0].reduce((total,item)=> total += item.quantity * item.currentPrice,0) * 100) / 100).toFixed(2)}
                  </p>
              </div>
              
              <button className="submit-order" type="submit" form="form-order">Realizar Pedido</button>
            </div>

            <div id="orderPlaced"></div>
          </div>
          )}}
          </ShopContext.Consumer>
      </section>
    </main>
  );
}