import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

import {UserContext} from "../Contexts/userContext";

import './MyOrders.css';

function ListRow(props){
  return(
    <ListGroup horizontal="sm" variant="flush">        
      <ListGroup.Item>{props.pedidos.orderID}</ListGroup.Item>
      <ListGroup.Item>
        <img className="img-list" alt={props.pedidos.name} src={require(`../${props.pedidos.imageURL}`).default}/></ListGroup.Item>
      <ListGroup.Item>{props.pedidos.name}</ListGroup.Item>
      <ListGroup.Item>{props.pedidos.valueItem}</ListGroup.Item>

    </ListGroup>
  )
}


export default function MyOrders(){
  const [meusPedidos,setMeusPedidos] = useState([]);
  const mounted = useRef(true);
  const user = useContext(UserContext);

  //console.log(user.user);
  useEffect(() =>{
    const url =  `http://pitanga/api/myorders.php?id=${user.user[0].userID}`;
    
    fetch(url)
      .then(response => response.json())
      .then( orders => {
        if(mounted.current) {         
        setMeusPedidos(orders);
        console.log(orders);
        }
      });
    return () => mounted.current = false;
  },[meusPedidos]);

  console.log(meusPedidos);
  return(
    <main>
      <h1 className="sectionTitle">Meus Pedidos</h1>
      <section id="myorders-page">
      <ListGroup horizontal="sm" variant="flush">
        <ListGroup.Item>Ordem N&ordm;</ListGroup.Item>
        <ListGroup.Item>Imagem</ListGroup.Item>
        <ListGroup.Item>Produto</ListGroup.Item>
        <ListGroup.Item>Preço</ListGroup.Item>
      </ListGroup>
      {meusPedidos && meusPedidos.map( pedidos =>
        <ListRow pedidos={pedidos} key={pedidos.name}/>
      )}
      </section>
    </main>
  );
}