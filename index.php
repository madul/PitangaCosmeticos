<!DOCTYPE html>
<?php require('./php/actions/connectionBD.php'); ?>

<html lang="pt-br">
<head>
    <?php require_once('./php/includes/links-head.php') ?>
    <title>Pitanga Cosméticos</title>

</head>

<body>
    <!-- Início do Menu-->
    <header id="menu">
        <?php require('./php/includes/menubar.php'); ?>
    </header>
    <!-- Fim do Menu-->

    <!--Main-->
    <div id="promo" class='jumbotron bg-white'>
        <img src="./images/sale.png" alt="30% OFF linha Manga Rosa" width="100%" > <!--Fundo foto criado por freepik - br.freepik.com -->
    </div>

    <!-- Fim  do Main-->
    
    <!-- FOOTER -->
    <?php require_once("./php/includes/footer.php"); ?>
    <?php require_once('./php/includes/links-body.php') ?>
</body>

</html>