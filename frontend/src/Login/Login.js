  import React, { useContext, useState } from 'react';
  import { Form} from 'react-bootstrap';

  import {UserContext} from "../Contexts/userContext";

  import './Login.css';
  
  export default function Login(props){
    const [userstate, setUserState] = useState({});
    const user = useContext(UserContext);
    user.setUser = (dados) =>{
      user.user = dados;
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e){
      /* console.log(e.target.email.value)
      console.log(new FormData(e.target)) */
      e.preventDefault();
      //console.log(e.target)
      fetch("http://localhost:3001/login", { 
        method: "post",
         headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': "*",
          
        }, 
        body:  JSON.stringify({
          "email": e.target.email.value,
          "password": e.target.password.value
        })
      })
      .then(resposta => resposta.json())
      .then(resultado => {
        console.log(resultado)
        if(resultado.accessToken){
          console.log(resultado.accessToken)
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
            console.log("DENTRO ADMIN: ",result);
            if(!result){
              fetch("http://localhost:3001/user", { 
              method: "GET",
              headers: {
                "x-access-token": resultado.accessToken
              }
            }).then(res => res.json())
              .then(res => {
                console.log(res)
                if(res.client){
                  user.setUser(res.client);
                  setUserState(res.client);
                  props.changeName(res.client.name)
                }
              })
            }           
          })
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