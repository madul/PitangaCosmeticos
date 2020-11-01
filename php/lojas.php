<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); ?>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Pitanga Cosméticos</title>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/style-lojas.css">
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
        <p class="sectionTitle">Nossas Lojas</p>
        
        <div id='stores'>
            <div class='store'>
                <h3>Rio de Janeiro</h3>
                <p>Avenida Presidente Vargas, 5000</p>
                <p>10 &ordm; andar</p>
                <p>Centro</p>
                <p>(21) 3333-3333</p>
            </div>
            <div class='store'>
                <h3>São Paulo</h3>
                <p>Avenida Paulista, 985</p>
                <p>3 &ordm; andar</p>
                <p>Jardins</p>
                <p>(11) 4444-4444</p>
            </div>
            <div class='store'>
                <h3>Santa Catarina</h3>
                <p>Rua Major &Aacute;vila, 370</p>
                <p>10 &ordm; andar</p>
                <p>Vila Mariana</p>
                <p>(47) 5555-5555</p>
            </div>

        </div>
        
        <!-- End of Main-->

        <!-- FOOTER -->
        <?php require_once("./includes/footer.php"); ?>
    </body>
</html>