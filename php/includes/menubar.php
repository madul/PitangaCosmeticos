
<nav class="navbar navbar-expand-sm">
    <a class="navbar-brand ml-lg-5" href="../index.php">
        <img id="logo" src="../../images/pitanga2_logo_dark_menu.png" alt="Pitanga logo">
    </a>
    <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav nav-fill w-100 align-items-center">
            <a class="nav-item nav-link" href="../php/produtos.php">Produtos</a>
            <a class="nav-item nav-link" href="../php/lojas.php">Nossas Lojas</a>
            <a class="nav-item nav-link" href="../php/contatos.php">Fale Conosco</a>
        
            <?php if(isset($_SESSION["username"])): ?>
            <div id="username">
                <a class="nav-item nav-link d-inline" href="../php/contatos.php"><?php echo $_SESSION["username"];?></a>
                <a class="nav-item nav-link d-inline" href="../php/logout.php" >
                    <img id="exit-icon" src="../../images/icon_exit.png" alt="Sair">
                </a>        
            </div>
            <?php else: ?>
                <p id="login-menu" class="nav-item nav-link mt-3" data-toggle="collapse" data-target="#login-container" onmouseover="onMouse(this)">Login</p>
            <?php endif; 
            ?>
        </div>
    </div>
</nav>


<?php 

    $loginPage =  strpos($_SERVER['REQUEST_URI'], 'php') == 1 
                ? './includes/login.php' 
                : './php/includes/login.php';
    require($loginPage); 
?>
