
<div id='login'>  
  <form id="form-signin" action="../php/signin.php" method="POST">
    <div class="email-container">
      <p>Email</p>
      <input type="email" id='email' name='email' required>
    </div>
    <div class="password-container">
      <p>Senha</p>
      <input type="password" id='password' name='password' required>
    </div>
  </form>
    <div id="buttons">
      <button type="submit" id='signin'name="signin" form="form-signin">Entrar</button>
      <a id="signup" href='../php/signup.php' target='_self'>Cadastrar</a>
  </div>
</div>