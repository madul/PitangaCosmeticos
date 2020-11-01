<!-- SHOPPING CART BUTTON -->
<button id="shop-cart-float-btn" onclick="openShopList()">
    <img src="../images/icon-shop-checkout.png" alt="shop-cart-checkout">
</button>
<!-- END OF SHOPPING CART BUTTON -->
<div id="shopping-list">
    <div id="headerCart">
        <p class="titleCart">Sua Compra</p>
        <p id="closeCart" onmouseover="onMouseP(this)" onmouseout="onMouseP(this)" onclick="closeShopList()">&times;</p>
    </div>    
    <div class="itemsList">

    <?php if (isset($_SESSION['products'])):
      $totalPrice = 0;
      $numItems = 0;
      foreach($_SESSION['products'] as $itemList): 
        $totalPrice += $itemList['price'] * $itemList['quantity'];
        $numItems += $itemList['quantity'];
      ?> 
        <div class="itemCart">
            <img class="imgCart" src="<?php echo "../images/".$itemList['image']?>" alt="Imagem">
            <div class="prodInfoCart">
                <p class="prodNameCart"><?php echo $itemList['name']?></p>
                <p class="prodContentCart"><?php echo $itemList['content']?></p>
                <p class="priceItemCart">R$ <?php echo $itemList['price']?></p>
            </div>
            <div>
              <form class="numItensCart" action="../php/actions/add-rem-shop-cart.php" method="post">
                <input type="text" name="id" value="<?php echo $itemList['id'];?>" hidden="true">
                <button type="submit" name="submit" value="sub" class="minus">-</button>
                <div class="number"><?php echo $itemList['quantity']?></div>
                <button type="submit" name="submit" value="add" class="plus">+</button>
              </form>
            </div>
            <div class="totalPriceItemCart">R$ <?php echo number_format($itemList['quantity'] * $itemList['price'],2);?></div>
            
        </div>
    <?php endforeach; endif; ?>
    </div>
    <div id="totalCart">
        <div class="infoTotalCart">
            <div>
                <p>Items: </p>
                <p><?php echo $numItems; ?></p>
            </div>
            <div>
                <p>Total: </p>
                <p>R$ <?php echo number_format($totalPrice,2); ?></p>
            </div>
        </div>
        <button id="checkout">Finalizar</button>
    </div>
</div>
<!-- SHOPPING CART MODAL -->

<!-- END OF SHOPPING CART MODAL -->