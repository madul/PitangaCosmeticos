<div id="orderDoc">
<div id="orderModule">
  <p>Preencha o formulário abaixo para realizar seu pedido dos produtos Pitanga</p>
  <br><br>

  <form id="form-order" action="" method="post">
    <div id="group-input">
      <div class="input-container-order">
        <p>Nome</p>
        <input type="text" name='name' required>
      </div>
      
      <div class="input-container-order">
        <p>Sobrenome</p>
        <input type="text" name='surname' required>
      </div>
    </div>
    
    <div id="group-input">
      <div class="input-container-order">
        <p>Email</p>
        <input id="email-order" type="text" name='email' required>
      </div>
      
      <div class="input-container-order">
        <p>CPF</p>
        <input type="number" id="cpf" name='cpf' onkeyup="validate_data(this)"required>
      </div>
    </div>
    <div id="group-input">
      <div class="input-container-order">
        <p>Endereço</p>
        <input id="address" type="text" name='address' required>
      </div>
      <div id="complemento" class="input-container-order">
        <p>Complemento</p>
        <input id="compl" type="text" name='compl' required>
      </div>
    </div>
    <div id="group-input">
      <div class="input-container-order">
        <p>Cidade</p>
        <input id="city" type="text" name='city' required>
      </div>
      <div id="state" class="input-container-order">
        <p>UF</p>
        <input id="uf" type="text" name='state' required>
      </div>
      <div class="input-container-order">
        <p>CEP</p>
        <input id="cep" type="number" name='cep' min="0" max="99999999" onkeyup="validate_data(this)" required>
      </div>
    </div>
    <br>
    <p>Lista de Produtos</p>
    <br><br>
    <?php
      foreach ($products as $product): ?>
        <div class="prod-form-order">
          <input id="qtd-prod-product-<?php echo $product['productID'];?>" 
                type="number" 
                name="product<?php echo $product['productID'];?>" 
                value="0"
                min="0" 
                onchange="updateValueOrder()"/>
          
          <label for="product<?php echo $product['productID'];?>">

            <img src="<?php echo "../images/".$product['imageURL'];?>" alt="<?php echo $product['name'];?>">
            <p><?php echo $product['name'];?> </p>
            <p>-</p>
            <p>R$ <?php echo $product['currentPrice'];?></p>
          
          </label>
          <br>
        </div>
    <?php endforeach;?>
    
  </form>
  <div id="totalPriceContainer">
      <p>Total: </p>
      <p id="totalPriceOrder">R$ 0.00</p>
    </div>
  <button type="submit" form="form-order">Realizar Pedido</button>
</div>

<div id="orderPlaced"></div>
</div>