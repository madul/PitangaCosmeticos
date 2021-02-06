import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

import './MyOrders.css';

function ListRow(props){
  return(
    <ListGroup horizontal="sm" variant="flush">        
      <ListGroup.Item>{props.pedidos.orderID}</ListGroup.Item>
      <ListGroup.Item>
        <img className="img-list" alt={props.pedidos.name} src={require(`../../${props.pedidos.imageURL}`).default}/></ListGroup.Item>
      <ListGroup.Item>{props.pedidos.name}</ListGroup.Item>
      <ListGroup.Item>{props.pedidos.valueItem}</ListGroup.Item>

    </ListGroup>
  )
}


function MyOrders(props){
  const [meusPedidos,setMeusPedidos] = useState([]);
  const mounted = useRef(true);
  
  useEffect(() =>{
    const url =  `http://localhost:3001/myOrders`;
    
    fetch(url,{ 
        method: "GET",
        headers: {
          "id": props.user.user.clientID
        }
      })
      .then(response => response.json())
      .then( orders => {
        if(orders){
          if(mounted.current) {         
            setMeusPedidos(orders.orders);
          }
        }        
      });
    return () => mounted.current = false;
  },[meusPedidos]);

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
        <ListRow pedidos={pedidos} key={`${pedidos.orderID}-${pedidos.name}`}/>
      )}
      </section>
    </main>
  );
}

const mapStateToProps = state =>({
  user: state.user
})

export default connect(mapStateToProps)(MyOrders)