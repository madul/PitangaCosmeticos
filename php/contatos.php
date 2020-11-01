<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); ?>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Pitanga Cosméticos</title>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/style-contatos.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
        <div id='contatosBody'>
            <div id='contatos'>
                <div class='contato'>
                    <img src="../images/email.jpg" alt="email">
                    <p>contato@fullstackeletro.com.br</p>
                </div>
                <div class='contato'>
                    <img src="../images/whatsapp.jpg" alt="whatsapp">
                    <p>(11) 99999-9999</p>
                </div>            
            </div>
            <div id='mensagem'>
                <form>
                    <h4>Nome: </h4>
                    <input type="text" style="width: 400px;">
        
                    <h4>Mensagem: </h4>
                    <textarea style="width: 400px; height:100px"></textarea>
        
                    <br>
                    <input type="submit" value="Enviar">
                </form>        
            </div>
        </div>

        <!-- FOOTER -->
        <?php require_once("./includes/footer.php"); ?>
    </body>
</html>