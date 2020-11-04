<div id="orderDoc" class="container-fluid flex-column align-items-center justify-content-center">
<div id="orderModule" class="container-fluid flex-column w-100">
  <p>Preencha o formulário abaixo para realizar seu pedido dos produtos Pitanga</p>
  <br><br>
  
  <form id="form-order" action="" method="post">
   
    <div id="group-input" class="form-row justify-content-center m-0 p-0">
      <div class="form-group col-md-5">
        <p>Nome</p>
        <input class="form-control" type="text" name='name' required>
      </div>
      
      <div class="form-group col-md-6">
        <p>Sobrenome</p>
        <input class="form-control" type="text" name='surname' required>
      </div>
    </div>
    
    <div id="group-input" class="form-row justify-content-center m-0 p-0">
      <div class="form-group col-md-7">
        <p>Email</p>
        <input class="form-control" id="email-order" type="text" name='email' required>
      </div>
      
      <div class="form-group col-md-4">
        <p>CPF</p>
        <input class="form-control" type="number" id="cpf" name='cpf' onkeyup="validate_data(this)"required>
      </div>
    </div>

    <div id="group-input" class="form-row justify-content-center m-0 p-0">
      <div class="form-group col-md-3">  
        <p>CEP</p>
        <input class="form-control" id="cep" type="number" name='cep' min="0" max="99999999" onkeyup="validate_data(this)" required>
      </div>
      <div id="state" class="form-group col-2">
        <p>UF</p>
        <input class="form-control" id="uf" type="text" name='state' required>
      </div>
      <div class="form-group col-md-6">
        <p>Cidade</p>
        <input class="form-control" id="city" type="text" name='city' required>
      </div>
    </div>
    
    <div id="group-input" class="form-row justify-content-center m-0 p-0">
      <div class="form-group col-md-7">
        <p>Endereço</p>
        <input class="form-control" id="address" type="text" name='address' required>
      </div>
      <div id="complemento" class="form-group col-4">
        <p>Complemento</p>
        <input class="form-control" id="compl" type="text" name='compl' required>
      </div>
    </div>
    
    <br>
    <p class="h4 text-danger">Lista de Produtos</p>
    <br>
    <?php
      foreach ($products as $product): ?>
        <div class="prod-form-order form-row align-items-center">
          <input class="form-control col-md-1 mx-3" id="qtd-prod-product-<?php echo $product['productID'];?>" 
                type="number" 
                name="product<?php echo $product['productID'];?>" 
                value="0"
                min="0" 
                onchange="updateValueOrder()"/>
          
          <label for="product<?php echo $product['productID'];?>" class="col row align-items-center">

            <img src="<?php echo "../images/".$product['imageURL'];?>" alt="<?php echo $product['name'];?>" 
            class="col-2 img img-thumbnail">
            <p class="col-5"><?php echo $product['name'];?> </p>
            <p class="col-1 text-center">-</p>
            <p class="col">R$ <?php echo $product['currentPrice'];?></p>
          
          </label>
          <br>
        </div>
    <?php endforeach;?>
    
  </form>
  <div id="totalPriceContainer" class="row justify-content-center">
      <p id="totalPriceOrder" class="h4 text-success m-5">Total:  R$ 0.00</p>
    </div>
  <button type="submit" form="form-order" class="btn btn-block">Realizar Pedido</button>
</div>

<div id="orderPlaced"></div>
</div>