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
    async function login(e){
      e.preventDefault();
      console.log(e.target)
      fetch("http://pitanga/api/user.php", { method: "POST", body: new FormData(e.target) })
      .then(resposta => resposta.json())
      .then(resultado => {
        user.setUser(resultado);
        setUserState(resultado[0]);
        props.changeName(resultado[0].name)
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