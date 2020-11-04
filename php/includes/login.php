
<div id="login-container" class= "collapse container-fluid justify-content-end p-0">

  <div id='login' class="p-2 float-right d-lg-flex flex-column">  
    <form id="form-signin" class=" d-flex flex-column justify-content-start"action="../php/signin.php" method="POST">
      <div class="email-container form-group">
        <label for="email">Email</label>
        <input type="email" id='email' name='email' class="form-control" placeholder="Digite seu email" required>
      </div>
      <div class="password-container form-group">
        <label for="password">Senha</label>
        <input type="password" id='password' name='password' class="form-control" placeholder="Digite sua senha" required>
      </div>
    </form>
    <div id="buttons" class="d-flex flex-column p-2">
      <button type="submit" id='signin-btn' class="btn text-light my-2" name="signin" form="form-signin">Entrar</button>
      <a id="signup-btn" class="btn my-2" href='../php/signup.php' target='_self'>Cadastrar</a>
    </div>
  </div>

</div>
