<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); 
      require('./actions/get-product-BD.php');
?>

<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/style-prod.css">
        <?php include("./actions/filter-array.php") ?>
        <script defer src='../js/script-prod.js'></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
        
        
        <title>Pitanga Cosméticos - Produtos</title>
    </head>
    <body>
        
        <!-- Início do Menu-->
        <header id="menu">
            <?php require('../php/includes/menubar.php'); ?>
        </header>
        <!-- Fim do Menu-->

        <div id='bodyWrapper'>

        <!-- Main -->
        <!--title-->
        <p class="sectionTitle">Produtos</p>

        <!-- Modal-->
        <div class="modal">
            <span class="close" onmouseover="pointer(this)" onclick="apareceModal()">&times;</span>
            <div class="modalBody"> 
                <div class="modalImage"></div>
                <div class="modalText"></div>
                <div class="modalButtons">
                    <button class="modalAddProd" onclick="addItemCart()">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
        <!-- Fim do Modal-->

        <div id='prodBody'>

            <?php include_once('./includes/shopList.php') ?>
            
            <!-- side menu-->
            <div id="sideMenu">
                <p id="order" onclick="order()" onmouseover="onMouseP(this)"onmouseout="onMouseP(this)">Fazer pedido</p>
                <p>Categorias</p>

                <ul>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('todos')">
                        Todos 
                        <?php 
                            echo "(".filter_by_value($products, "category", 'todos').")";
                        ?>    
                    </li>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('makeup')">
                        Maquiagem 
                        <?php 
                            echo "(".filter_by_value($products, "category", 'makeup').")";
                        ?> 
                    </li>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('perfume')">
                        Perfumes 
                        <?php 
                            echo "(".filter_by_value($products, "category", 'perfume').")";
                        ?>                    
                    </li>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('dailycare')">
                        Cuidados diários 
                        <?php 
                            echo "(".filter_by_value($products, "category", 'dailycare').")";
                        ?>
                    </li>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('hair')">
                        Cabelos 
                        <?php 
                            echo "(".filter_by_value($products, "category", 'hair').")";
                        ?>
                    </li>
                    <li onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('beard')">
                        Barba
                        <?php 
                            echo " (".filter_by_value($products, "category", 'beard').")";
                        ?>
                    </li>
                </ul>
            </div>
            <!-- ORDER FORM -->
            <?php include_once('../php/actions/order.php') ?>
            <!-- Products-->
            <div id="showcase">
                <?php
                    foreach ($products as $product) { ?>
                        <div id="<?php echo $product['productID'];?>" class="product <?php echo $product['category'];?>">
                            <div class='imageContainer'>
                                <a href="<?php echo $product['href']?>" target="_blank">
                                    <img src="../images/<?php echo $product['imageURL'];?>" alt="Corretivo alta cobertura">
                                </a>
                                <div class='infoRapida' onclick='apareceModal(); montarModal(this)' onmouseover="pointer(this)" onmouseout="pointer(this)">
                                    <p>Espiadinha</p>
                                </div>
                            </div>
                            <div class='prod-desc'>
                                <p class='prod-name'><?php echo $product['name'];?></p>
                                <p class='prod-range'><?php echo $product['range'];?></p>
                            </div>
                            <div class="prod-footer">
                                <div class='prod-price'>
                                    <?php 
                                        if ($product['currentPrice'] != $product['price']){
                                            echo "<p class='old-price'>R$ ".$product['price']."</p>";
                                        }
                                    ?>                                
                                    <p class='price'> R$ <?php echo $product['currentPrice'];?></p>
                                </div>
                                <div class="shop-cart">
                                    <form action="../php/actions/add-rem-shop-cart.php" method="post">
                                        <input name="id" type="number" value="<?php echo $product['productID']?>" hidden="true">
                                        <input name="image" type="text" value="<?php echo $product['imageURL']?>" hidden="true">
                                        <input name="name" type="text" value="<?php echo $product['name']?>" hidden="true">
                                        <input name="content" type="text" value="<?php echo $product['content']?>" hidden="true">
                                        <input name="price" type="number" value="<?php echo $product['currentPrice']?>" hidden="true">
                                        <button type="submit" name="submit" value="add" onmouseover="onMouse(this)">
                                            <img src="../images/icon-shop-plus.png" alt="Corretivo alta cobertura">
                                        </button>
                                    </form>                                    
                                </div>
                            </div>
                        </div>
                   <?php }
                ?>
            </div>

        </div>
        <!-- FOOTER -->
        <?php require_once("./includes/footer.php"); ?> 
        </div>
    </body>
</html>