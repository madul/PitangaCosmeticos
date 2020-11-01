<!DOCTYPE html>
<?php require('./php/actions/connectionBD.php'); ?>

<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <title>Pitanga Cosméticos</title>

</head>

<body>
    <!-- Início do Menu-->
    <header id="menu">
        <?php require('./php/includes/menubar.php'); ?>
    </header>
    <!-- Fim do Menu-->

    <!--Main-->
    <div id="promo">
        <img src="./images/sale.png" alt="30% OFF linha Manga Rosa"> <!--Fundo foto criado por freepik - br.freepik.com -->
    </div>

    <!-- Fim  do Main-->
    
    <!-- FOOTER -->
    <?php require_once("./php/includes/footer.php"); ?>
</body>

</html>