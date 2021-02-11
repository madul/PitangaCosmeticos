import React from 'react';
import {useState} from 'react';
import { Form, Col } from 'react-bootstrap';


//import './SignUP.css';

export default function SignUp(){
 /*  let [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }; */
 /*  function register(e){
    e.preventDefault();
    fetch("http://localhost:3001/signup", 
    { method: "POST", 
      body: new FormData(e.target) 
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
  } */ 
  return(
    <main>
      <h1 class="sectionTitle">Cadastro</h1>
      
      <section id="cadastro">
          <Form id="form-cadastro-cliente" /* noValidate validated={validated} onSubmit={handleSubmit} */ method='post'>
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
                <Form.Control required name="cpf" type="number"/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Senha</Form.Label>
                <Form.Control required name="password" type="password" placeholder="Senha"/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Confirme sua senha</Form.Label>
                <Form.Control required name="checkPassword" type="password"/>
              </Form.Group>
            </Form.Row>
              
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>CEP</Form.Label>
                <Form.Control required name="zipCode" type="number"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={1}>
                <Form.Label>UF</Form.Label>
                <Form.Contro name="uf" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Cidade</Form.Label>
                <Form.Control required name="city" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control required name="logradouro"/>
              </Form.Group>
              <Form.Group as={Col} xs={2}>
                <Form.Label>Número</Form.Label>
                <Form.Control required name="address-number" type="number" />
              </Form.Group>
              <Form.Group as={Col} xs={3}>
                <Form.Label>Complemento</Form.Label>
                <Form.Contro name="compl" />
              </Form.Group>
            </Form.Row>
            
          </Form>
          <button id="btn-register" type="submit"  form='form-cadastro-cliente'>Cadastrar</button>         
      </section>
    </main>
  );
}