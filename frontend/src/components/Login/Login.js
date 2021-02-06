import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';

import * as UserAction from '../../actions/userActions';
import './Login.css';

function Login(props){

  async function login(e){
    e.preventDefault();
    fetch("http://localhost:3001/login", { 
      method: "post",
        headers: {
        'Content-Type': 'application/json',
      }, 
      body:  JSON.stringify({
        "email": e.target.email.value,
        "password": e.target.password.value
      })
    })
    .then(resposta => resposta.json())
    .then(resultado => {
      if(resultado.accessToken){
        props.changeToken(resultado.accessToken)
        fetch("http://localhost:3001/admin", { 
          method: "GET",
          headers: {
            "x-access-token": resultado.accessToken
          }
        }).then(result => {
          result.json()}
          )
        .then(result => {
          if(!result){
            fetch("http://localhost:3001/user", { 
            method: "GET",
            headers: {
              "x-access-token": resultado.accessToken
            }
          }).then(res => res.json())
            .then(res => {
              if(res.client){
                props.setUser(res.client);
                props.changeName(res.client.name)
              }
            })
          }           
        })
      } 
      else {
        alert("Usuário e/ou senha errados!")
      }
      
    }); 
  }

  return(
    <div id="login-container" className= "collapse container-fluid justify-content-end p-0">
      
      <div id='login' className="p-2 float-right d-lg-flex flex-column">  
        <Form id="form-signin" onSubmit={login}>
          <div className="email-container form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' className="form-control" placeholder="Digite seu email" required/>
          </div>
          <div className="password-container form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id='password' name='password' className="form-control" placeholder="Digite sua senha" required/>
          </div>
        </Form>
        <div id="buttons" className="d-flex flex-column p-2">
          <button type="submit" id='signin-btn' className="btn text-light my-2" name="signin" form="form-signin">Entrar</button>
          <button id="signup-btn" className="btn my-2" disabled>Cadastrar</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state =>({
  user: state.user
})
const mapDispatchToProps = (dispatch) => 
      bindActionCreators(UserAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login)