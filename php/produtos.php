<!DOCTYPE html>
<?php require('./actions/connectionBD.php'); 
      require('./actions/get-product-BD.php');
?>

<html lang="pt-br">
    <head>
        <?php require_once('../php/includes/links-head.php') ?>
        
        <?php include("./actions/filter-array.php") ?>
        
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

        <div id='bodyWrapper' class='container-fluid m-0 px-0'>

        <!-- Main -->
        <!--title-->
        <p class="sectionTitle">Produtos</p>

        <!-- Modal-->
        <div id='modalProd' class="modal fade" tabindex="-1" role="dialog">
            
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content text-lg-left">
                    <div class="modal-header border-0 pb-0">
                        <div class="modalHText d-flex flex-column"></div>
                        <span class="close" onmouseover="pointer(this)"  data-dismiss="modal" aria-label="Close">&times;</span>
                    </div>
                    <div class="modalBody modal-body mt-0 "> 
                        <div class="container-fluid row">
                           <div class="modalImage col-4 m-0 p-0"></div>
                           <div class="modalText col-8"></div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <div class="modalButtons">
                            <button class="modalAddProd btn btn-success" onclick="addItemCart()">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim do Modal-->

        <div id='prodBody'>

            <?php //include_once('./includes/shopList.php') ?>
            
            <!-- side menu-->
            <div id="sideMenu">
                <p id="order" onclick="order()" onmouseover="onMouseP(this)" onmouseout="onMouseP(this)"><b>Fazer pedido</b></p>
                <p><b>Categorias</b></p>

                <ul>
                <?php
                    $menu_item = ["Todos","Maquiagem","Perfumes","Cuidados diários","Cabelos","Barba"];
                    $categories=["all","makeup","perfume","dailycare","hair","beard"];
                  
                    foreach ($menu_item as $index => $menu):?>
                        <li class="nav-link" onmouseout="onMouseP(this)" onmouseover="onMouseP(this)" onclick="select('<?php echo $categories[$index] ?>')">
                            <?php echo $menu. "(".filter_by_value($products, "category", $categories[$index]).")"; ?>    
                        </li>
                    <?php endforeach; 
                ?>
                </ul>
            </div>

            <!-- ORDER FORM -->
            <?php include_once('../php/actions/order.php') ?>
            
            <!-- Products-->
            <div id="showcase">
                <?php
                    foreach ($products as $product) { ?>
                        <div id="<?php echo $product['productID'];?>" class="product <?php echo $product['category'];?>">

                            <div class='imageContainer pt-3'>
                                <a href="<?php echo $product['href']?>" target="_blank">
                                    <img src="../images/<?php echo $product['imageURL'];?>" 
                                    class="h-100" alt="Corretivo alta cobertura">
                                </a>
                                <div class='infoRapida' data-toggle="modal" data-target="#modalProd" onclick='montarModal(this)'   onmouseover="pointer(this)" onmouseout="pointer(this)">
                                    <p class="m-0">Espiadinha</p>
                                </div>
                            </div>

                            <div class='prod-desc'>
                                <p class='prod-name mb-0'><?php echo $product['name'];?></p>
                                <p class='prod-range pt-2'><?php echo $product['range'];?></p>
                            </div>

                            <div class="prod-footer d-flex align-items-between justify-content-around justify-self-center w-100 border-top border-danger p-2">
                                <div class='prod-price d-flex flex-column justify-content-center align-items-center justify-self-center'>
                                    <?php 
                                        if ($product['currentPrice'] != $product['price']){
                                            echo "<p class='old-price mb-0'>R$ ".$product['price']."</p>";
                                        }
                                    ?>                                
                                    <p class='price mt-0'> R$ <?php echo $product['currentPrice'];?></p>
                                </div>
                                
                            </div>
                        </div>
                   <?php }
                ?>
            </div>

        </div>
        <!-- FOOTER -->
        <?php require_once("./includes/footer.php"); ?> 
        <?php require_once('../php/includes/links-body.php') ?>
        </div>
    </body>
</html>