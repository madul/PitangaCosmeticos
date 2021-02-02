import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function ProdModal(props){
  const details = props.product.details.split('<br>');


  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="quick-info-product"
      centered
    >
      <Modal.Header closeButton closeLabel="Fechar">
      <p>{props.product.range} - {props.product.content} </p>
        <Modal.Title id="quick-info-product">
          {props.product.name}
        </Modal.Title>
        
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col className="modal-body-personal" xs={12} md={4}>
              <img src={require(`../${props.product.imageURL}`).default} alt={props.product.name} />
            </Col>
            <Col>
              <p className="prod-description-modal"> {props.product.description}</p>
              <p><strong>{details[0]}</strong> </p>

              {details.map((item,index)=>{
                if (index !=0)
                  return <p key={"det-",index}>{item}</p>
              })}
            </Col>
          </Row>  
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>Adicionar ao Carrinho</Button>
      </Modal.Footer>
    </Modal>
  );
}