<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); ?>
<html lang="pt-br">
    <head>
        <?php require_once('../php/includes/links-head.php') ?>
        <title>Pitanga Cosméticos</title>
    </head>
    <body>
        <!-- Início do Menu-->
        <header id="menu">
            <?php require('../php/includes/menubar.php'); ?>
        </header>
        <!-- Fim do Menu-->
        
        <!-- Main -->
      
        <!--title-->
        <p class="sectionTitle">Contatos</p>
        
        <!-- meios de contato -->
        <div id='contatosBody' class="container-fluid row mb-5">
            <div id='contatos' class="col-6 container-fluid d-flex flex-column align-items-center justify-content-center">
                <div class='row align-items-center justify-content-center'>
                    <img width="40px;" src="../images/whatsapp.jpg" alt="whatsapp">
                    <p class="m-0 p-0">(11) 99999-9999</p>
                </div> 
                <div class='d-flex flex-row align-items-center justify-content-center'>
                    <img width="40px" src="../images/email.jpg" alt="email">
                    <p class="m-0 p-0">contato@fullstackeletro.com.br</p>
                </div>
            </div>
            <div id='mensagem' class="container-fluid border-left border-secondary col-6 p-4 d-flex flex-column align-items-center justify-content-center ">
                <form class="w-75">
                    <div class="form-group">
                        <p>Nome: </p>
                        <input class="form-control" type="text">
                    </div>
                    <div class="form-group">
                        <p>Email: </p>
                        <input class="form-control" type="text" >
                    </div>
                    <div class="form-group">
                        <p>Assunto: </p>
                        <select class="form-control">
                            <option>Dúvidas</option>
                            <option>Reclamações</option>
                            <option>Elogios e Sugestões</option>
                        </select>                    
                    </div>
                    <div class="form-group">
                        <p>Mensagem: </p>
                        <textarea class="form-control" style=" height:100px"></textarea>
                    </div>
                    <br>
                    <input class="btn btn-success" type="submit" value="Enviar">
                </form>        
            </div>
        </div>

        <!-- FOOTER -->
        <?php require_once("./includes/footer.php"); ?>
        <?php require_once('../php/includes/links-body.php') ?>
    </body>
</html>