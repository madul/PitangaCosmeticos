import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col} from 'react-bootstrap';

import './Contact.css';

export default function Contact(props){
  return(
    <main>
      <h1 className="sectionTitle">Contatos</h1>
      <section id="contact-page" className="container-fluid row mb-5">
        <Col id='contatos'>
          <Row>
              <img width="40px;" src={require(`../images/whatsapp.jpg`).default} alt="whatsapp"/>
              <p>(11) 99999-9999</p>
          </Row> 
          <Row>
              <img width="40px" src={require(`../images/email.jpg`).default} alt="email" />
              <p>contato@fullstackeletro.com.br</p>
          </Row>
        </Col>
        <Col id='mensagem'>
          <Form>
            <Form.Group id="form-nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text"/>            
            </Form.Group>
            <Form.Group id="form-email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"/>            
            </Form.Group>
            <Form.Group id="form-subject">
              <Form.Label>Assunto</Form.Label>
              <Form.Control as="select">
                <option>Dúvidas</option>
                <option>Reclamações</option>
                <option>Elogios e Sugestões</option>
              </Form.Control>  
            </Form.Group>
            <Form.Group id="form-message">
              <Form.Label>Mensagem</Form.Label>
              <Form.Control as="textarea" rows={5}/>            
            </Form.Group>
            <Button type="submit">Enviar</Button>
          </Form>       
        </Col>
      </section>
    </main>
  );
}