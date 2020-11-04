<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); ?>
<html lang="pt-br">
    <head>
        <?php require_once('../php/includes/links-head.php') ?>
        
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
          <div id="messageBack" class="container"></div>
          
          <div id="cadastro" class=" container-fuid justify-content-center align-items-center d-flex flex-column mb-3">
              <form id="form-cadastro-cliente" class="w-50" action="" method='post'>
                <div class="input-container form-group">
                    <p>Nome</p>
                    <input id="name" class="form-control" name='name' type="text" required>
                </div>

                <div class="input-container form-group">
                    <p>Sobrenome</p>
                    <input id="surname" class="form-control" name='surname' type="text" required>
                </div>

                <div class="input-container form-group">
                    <p>CPF <span> (apenas números)</span></p>
                    <input id="cpf" class="form-control" name='cpf'type="number" onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container form-group">
                    <p>Email</p>
                    <input id="email" class="form-control" name='email' type="email" onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container form-group">
                <p>Senha</p>
                <input id="senha" class="form-control" name='senha' type='password' onkeyup="validate_data(this)" required>
                </div>

                <div class="input-container form-group">
                    <p>Confirme sua senha</p>
                    <input id="confirmSenha" class="form-control" name='confirmSenha' type='password' onkeyup="validate_data(this)" required>
                </div>

              </form>
              <button id="btn-register" class="btn my-3" type="submit" disabled form='form-cadastro-cliente'>Cadastrar</button>         
          </div>
        </main>
    </body>
</html>