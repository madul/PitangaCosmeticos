import React from 'react';
import {useState} from 'react';
import { Form, Col } from 'react-bootstrap';
import {validate_data} from './validation';
import { useHistory } from "react-router-dom";

import './SignUp.css';


export default function SignUp () {
  let [messageCPF, setMessageCPF] = useState("");
  let [messageCEP, setMessageCEP] = useState("");
  let [messageConfirmSenha, setMessageConfirmSenha] = useState("");
  const history = useHistory();
  
  const handleKeyUp = (e) => {
    e.preventDefault();
    let {campo, message } = validate_data(e)

    if (campo === 'cpf'){
      setMessageCPF(message);
    } else if (campo === 'cep'){
      setMessageCEP(message)
    } else if (campo === 'confirmSenha'){
      setMessageConfirmSenha(message)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("EVENTO:", event.target)
    fetch("http://localhost:3001/signup", 
    { method: "POST", 
      body: new FormData(event.target) 
    })
    .then(response => response.json())
    .then(result => {       
      if(result.status){        
        alert(result.message);
        history.push('/')
      }
      else{
        alert(result.message);
      }
    });
  };
  
  return(
    <main>
      <h1 class="sectionTitle">Cadastro</h1>

      <section id="cadastro" class="container-fluid">
        <Form id="form-cadastro-cliente" onSubmit={handleSubmit}  method='post'>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label >Nome</Form.Label>
              <Form.Control required id="name" name="name" placeholder="Nome"/>
            </Form.Group>
                
            <Form.Group as={Col}>
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control required name="surname" placeholder="Sobrenome"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control required name="email" type="email" placeholder="Email"/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>CPF</Form.Label>
                <Form.Control id="cpf" onKeyUp={handleKeyUp} required name="cpf" type="number"/>
                {messageCPF && <span className="wrong-input">{messageCPF}</span>}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Senha</Form.Label>
                <Form.Control id='senha' required name="password" type="password" placeholder="Senha"/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Confirme sua senha</Form.Label>
                <Form.Control id="confirmSenha" onKeyUp={handleKeyUp} required name="checkPassword" type="password" placeholder="Confirme sua senha"/>
                {messageConfirmSenha && <span className="wrong-input">{messageConfirmSenha}</span>}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>CEP</Form.Label>
                <Form.Control id='cep' onKeyUp={handleKeyUp} required name="zipCode" type="number"/>
                {messageCEP && <span className="wrong-input">{messageCEP}</span>}
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Label>UF</Form.Label>
                <Form.Control id="uf" required name="state" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Cidade</Form.Label>
                <Form.Control id="city" required name="city" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control id="address" required name="address"/>
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Label>Número</Form.Label>
                <Form.Control name="address-number" type="number" />
              </Form.Group>
              <Form.Group as={Col} xs={3}>
                <Form.Label>Complemento</Form.Label>
                <Form.Control name="compl" />
              </Form.Group>
            </Form.Row>
        </Form>

        <button className="submit" id="btn-register" type="submit"  form='form-cadastro-cliente' disabled={!(messageConfirmSenha ==="" && messageCEP ==="" && messageCPF ==="")}>Cadastrar</button>

      </section>
    </main>
  )
}