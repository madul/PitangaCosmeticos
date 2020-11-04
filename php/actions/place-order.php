<?php
  require_once("connectionBD.php");
  require_once("get-product-BD.php");

//{
  $username = $_POST['name'];
  $surname = $_POST['surname'];

  $email = $_POST['email'];
  $cpf = $_POST['cpf'];

  $address = $_POST['address'] .", " . $_POST['compl'];
  $city = $_POST['city'];
  $state = $_POST['state'];
  $zipCode = $_POST['cep'];

  $itemsSold = array();
  foreach ($products as $product){
    //echo "item ".'product'.strval($product['productID']);
    if($_POST['product'.strval($product['productID'])] != 0){
      $item = array(
        "id" => $product['productID'], 
        "price" => $product['currentPrice'],
        "quantity" => $_POST['product'.strval($product['productID'])]);
      array_push($itemsSold,$item);
    }
  }

 /*  echo $username."<br>";
  echo $surname."<br>";
  echo $email."<br>";
  echo $cpf."<br>";
  echo $address."<br>";
  echo $city."<br>";
  echo $state."<br>";
  echo $zipCode."<br>";


  print_r($itemsSold);
  echo "<br>"; */
//}
//{
  /**get client from DB **/
  $sql = "select userID, cpf, zipCode from users where cpf=".$cpf;
  $result = $conn->query($sql);

  $user = array();
  while($row = $result->fetch_assoc()){
      $user = $row;
  } 

/*   print_r($user);
  echo "<br>";
 */
  if(count($user) > 0){
    if($user['zipCode'] == null || $user['zipCode'] != $zipCode){
      $sql = "update users set address = ?, city = ?, state = ?, zipCode = ? where userID = ?;";

      $stmt= $conn->prepare($sql);
      $stmt->bind_param("sssii", $address, $city, $state, $zipCode, $user['userID']);
      $stmt->execute();
    }
  } 
  else{
    //echo "array vazio <br>";
    $password = "fruta123";
    $sql = "insert into users (`name`, surname, cpf,email, pass, address, city, state, zipCode) 
    values(?,?,?,?,?,?,?,?,?)";

    $stmt= $conn->prepare($sql);
    $stmt->bind_param("ssisssssi",$username, $surname, $cpf,$email, $password,$address, $city, $state,$zipCode);
    $stmt->execute();

    $lastUserID = $conn->insert_id;

    $sql = "select userID, cpf, zipCode from users where cpf=".$cpf;
    $result = $conn->query($sql);

    $user = array();
    while($row = $result->fetch_assoc()){
        $user = $row;
    }
  }

  $id = $user['userID'];
//}
//{
  /** order **/

  $sql_order = "insert into orders (clientID) values (?)";
  $stmt= $conn->prepare($sql_order);
  $stmt->bind_param("i",$id);
  $stmt->execute();

  $lastOrderID = $conn->insert_id;
//}
//{
  $message = "Algo deu errado.";
/** soldItems **/
foreach($itemsSold as $itemS){
  $sql_soldItems = "insert into soldItems (productID, valueItem, quantity, orderID) values (?,?,?,?)";
  $stmt= $conn->prepare($sql_soldItems);
  $stmt->bind_param("iiii",$itemS['id'],$itemS['price'],$itemS['quantity'],$lastOrderID);
  if($stmt->execute()){
    $message = "Pedido realizado com sucesso. \n Obrigade, ".$username."!";
  }
  else{
    $sql_delete = "delete from orders where orderID = ".$lastOrderID;
    $conn->query($sql_delete);
    $sql_delete = "delete from soldItems where orderID = ".$lastOrderID;
    $conn->query($sql_delete);
    
    $message = "Pedido não realizado. Confira os dados";
  }
}

echo $message;


?>