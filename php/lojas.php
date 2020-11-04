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
        
        <p class="sectionTitle mb-5">Nossas Lojas</p>
        
        <div id='stores' class="container-fluid row my-5 pb-5">
            <div class='store col'>
                <h3>Rio de Janeiro</h3>
                <p>Avenida Presidente Vargas, 5000</p>
                <p>10 &ordm; andar</p>
                <p>Centro</p>
                <p>(21) 3333-3333</p>
            </div>
            <div class='store col'>
                <h3>São Paulo</h3>
                <p>Avenida Paulista, 985</p>
                <p>3 &ordm; andar</p>
                <p>Jardins</p>
                <p>(11) 4444-4444</p>
            </div>
            <div class='store col'>
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
        <?php require_once('../php/includes/links-body.php') ?>
    </body>
</html>