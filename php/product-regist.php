<!DOCTYPE html>
<html lang="pt-br">
    <?php 
      require('../actions/connectionBD.php');
    ?>
    <head>
        <meta charset="UTF-8">
        <title>Pitanga Cosméticos</title>
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/style-cadastroProdutos.css">
        <script>
            var myData = [
                <?php 
                    foreach ($products as $product){
                        echo '{';
                        foreach($product as $key => $value) {
                            echo '"'.$key.'"'.':'.'"'.$value.'"'.',';
                        }
                        echo '},';
                    }
                ?>
            ];
            
                                    
        </script>
        <script defer src='../js/script-cadastro-prod.js'></script>
    </head>
    <body>
        <!-- Início do Menu-->
        <header id="menu">
            <nav id="nav-bar">
                <div>
                    <a href="index.php">
                        <img id="logo" src="../images/pitanga_logo4_menu.png" alt="Pitanga logo">
                    </a>
                </div>
                
                <div id='icon-container'>
                    <a href="index.php">
                      <img id="exit-icon" src="../images/icon_exit.png" alt="Sair">
                    </a>
                </div>
            </nav>
        </header>
        <!-- Fim do Menu-->

        <!--title-->
        <p class="sectionTitle">Cadastro de Produtos</p>

        <!-- Main -->
        <main>
            <!-- side menu-->
            <div id="sideMenu">
              <ul>
                  <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="selectCad('cadastro-container')">Cadastrar Produtos</li>
                  <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="selectCad('alterar-container')">Alterar Produto</li>
              </ul>
            </div>
            <div id="mutable">
              <div id="cadastro-container">
                <form id="form-cadastro" action="../actions/register-product.php" method='post'>
                  <div id="form1">
                    <label for="imageURL">Nome da imagem</label>
                    <br>
                    <input id="imageURL" name='imageURL' type="text">
                    <br>
                    <label for="href">URL de referência</label>
                    <br>
                    <input id="href" name='href' type="text">
                    <br>
                    <label for="category">Categoria</label>
                    <br>
                    <input id="category" name='category'type="text">
                    <br>
                    <label for="price">Preço</label>
                    <br>
                    <input id="price" name='price' type="text">
                    <br>
                    <label for="description">Descrição</label>
                    <br>
                    <textarea id="description" name='description'></textarea>
                  </div>
                  <div id="form2">
                    <label for="name">Nome</label>
                    <br>
                    <input id="name" name='name' type="text">
                    <br>
                    
                    <label for="range">Linha</label>
                    <br>
                    <input id="range" name='range' type="text">
                    <br>
                    <label for="content">Conteúdo</label>
                    <br>
                    <input id="content" name='content' type="text">
                    <br>
                    <label for="details">Detalhes</label>
                    <br>
                    <textarea id="details" name='details'></textarea>         
                  </div>
                </form>   
                <button id="btn-register" form='form-cadastro'>Cadastrar</button>         
              </div>
              <div id="alterar-container">
                <?php
                  foreach ($products as $product){ ?>
                    <div class = 'product' id="<?php echo $product['productID'];?>" onclick="alterar(this)">
                      <img src="../images/<?php echo $product['imageURL'];?> " alt="<?php echo $product['name'];?>">
                      <p class = 'product-name'><?php echo $product['name'];?> </p>
                      <p class="product-price">R$ <?php echo $product['currentPrice'];?></p>
                    </div>

                  <?php
                  }
                ?>
              </div>
              <div id="alterar-prod">
              <form id="form-alteracao" action="../actions/alter-cadastro.php" method='post'>
                  <div id="form1">
                    <input type="hidden" id="alt-productID" name="productID">
                    <label for="alt-imageURL">Imagem</label>
                    <br>
                    <input id="alt-imageURL" name='imageURL' type="text">
                    <br>
                    <label for="alt-href">URL de referência</label>
                    <br>
                    <input id="alt-href" name='href' type="text">
                    <br>
                    <label for="alt-category">Categoria</label>
                    <br>
                    <input id="alt-category" name='category'type="text">
                    <br>
                    <label for="alt-price">Preço</label>
                    <br>
                    <input id="alt-price" name='price' type="text">
                    <br>
                    <label for="alt-currentPrice">Novo preço</label>
                    <br>
                    <input id="alt-currentPrice" name='currentPrice' type="text">
                    <br>
                    <label for="alt-description">Descrição</label>
                    <br>
                    <textarea id="alt-description" name='description'></textarea>
                  </div>
                  <div id="form2">
                    <label for="alt-name">Nome</label>
                    <br>
                    <input id="alt-name" name='name' type="text">
                    <br>
                    
                    <label for="alt-range">Linha</label>
                    <br>
                    <input id="alt-range" name='range' type="text">
                    <br>
                    <label for="alt-content">Conteúdo</label>
                    <br>
                    <input id="alt-content" name='content' type="text">
                    <br>
                    <label for="alt-details">Detalhes</label>
                    <br>
                    <textarea id="alt-details" name='details' ></textarea>         
                  </div>
                </form>   
                <button id="change" form='form-alteracao'>Alterar</button>         
              </div>
            </div>
        </main>
    </body>
</html>