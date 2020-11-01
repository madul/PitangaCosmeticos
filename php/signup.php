<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); ?>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/style-login.css">
        <script defer src='../js/script-cadastro-prod.js'></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <title>Pitanga Cosméticos - Cadastro</title>
    </head>

    <body>
        <!-- Início do Menu-->
        <header id="menu">
            <?php require('../php/includes/menubar.php'); ?>
        </header>
        <!-- Fim do Menu-->

        <!--title-->
        <p class="sectionTitle">Cadastro</p>

        <!-- Main -->
        <main>
          <div id="messageBack"></div>
          
          <div id="cadastro">
              <form id="form-cadastro-cliente" action="" method='post'>
                <div class="input-container">
                <p>Nome</p>
                <input id="name" name='name' type="text" required>
                </div>

                <div class="input-container">
                <p>Sobrenome</p>
                <input id="surname" name='surname' type="text" required>
                </div>

                <div class="input-container">
                <p>CPF <span> (apenas números)</span></p>
                <input id="cpf" name='cpf'type="number" onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container">
                <p>Email</p>
                <input id="email" name='email' type="email" onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container">
                <p>Senha</p>
                <input id="senha" name='senha' type='password' onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container">
                <p>Confirme sua senha</p>
                <input id="confirmSenha" name='confirmSenha' type='password' onkeyup="validate_data(this)" required>
                </div>

              </form>
              <button id="btn-register" type="submit" disabled form='form-cadastro-cliente'>Cadastrar</button>         
          </div>
        </main>
    </body>
</html>