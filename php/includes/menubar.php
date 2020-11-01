
<script type="text/javascript" src="../js/script.js"></script>
<link rel="stylesheet" href="../css/style.css">


<nav id="nav-bar">
    <div>
        <a href="../index.php">
            <img id="logo" src="../../images/pitanga_logo4_menu.png" alt="Pitanga logo">
        </a>
    </div>
    <div>
        <a href="../php/produtos.php">Produtos</a>
    </div>
    <div>
        <a href="../php/lojas.php">Nossas Lojas</a>
    </div>
    <div>
        <a href="../php/contatos.php">Fale Conosco</a>
    </div>
    <?php if(isset($_SESSION["username"])):
    ?>
    <div id="username">
        <a href="../php/contatos.php"><?php echo $_SESSION["username"];?></a>
        <a href="../php/logout.php" >
            <img id="exit-icon" src="../../images/icon_exit.png" alt="Sair">
        </a>        
    </div>
    <?php else: ?>
    <div>
        <p id="login-menu" onclick="loginpop()" onmouseover="onMouse(this)">Login</p>
    </div>
    <?php endif;?>
</nav>

<?php require('login.php'); ?>
