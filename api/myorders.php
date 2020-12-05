<?php
  header("Access-Control-Allow-Origin:*");
  
  require_once ('./db_connect.php');
  


  if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $id = $_GET['id'];
    $sql = "select products.name, products.imageURL, solditems.valueItem, solditems.orderID from solditems inner join products on products.productID = solditems.productID 
    inner join orders on orders.orderID = solditems.orderID where orders.clientID = $id;";
    $resultado = connectDB($sql);
    $items = [];

    while($linha = mysqli_fetch_assoc($resultado)){
        $items[] = $linha;
    }
    
    echo json_encode($items);
  }

?>