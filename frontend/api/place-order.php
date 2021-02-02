<?php
  header("Access-Control-Allow-Origin:*");
  
  $servername = "localhost";
  $username = "root";
  $password = "";
  $database = "pitangacos";

  $conn = mysqli_connect($servername, $username, $password, $database);
  
  if (!$conn){
      die("A conexão falhou. ".mysqli_connect_error());
  }
  session_start();
  $conn->query("SET NAMES utf8");

  
 /* $itemsSold = array();
  $sql = "SELECT * FROM products";
  $resultado = connectDB($sql);
  $products = [];

  while($linha = mysqli_fetch_assoc($resultado)){
      $products[] = $linha;
  } */
  

  $username = $_POST['name'];
  $surname = $_POST['surname'];

  $email = $_POST['email'];
  $cpf = $_POST['cpf'];

  $address      = $_POST['logradouro'];
  $addressNumber = $_POST['address-number'];
  $addressCompl = $_POST['compl'];
  $city         = $_POST['city'];
  $state        = $_POST['uf'];
  $zipCode      = $_POST['zipCode'];

  $itemsSold = array();
  $keys = array_keys($_POST);

  foreach($keys as $key){
    if(preg_match('/^product-/', $key)){
      $id=explode("-",$key)[1];
      $price = $_POST['price-'.strval($id)];
      $quantity = $_POST[$key];
      $item = array(
        "id" => $id, 
        "price" => $price,
        "quantity" => $quantity
      );
      array_push($itemsSold,$item);
    }
  }
   


  /**get client from DB **/
  $sql = "select userID, cpf, zipCode from users where email='$email'";
  $result = $conn->query($sql);
  //$result = connectDB($sql);

  $user = [];
  while($row = mysqli_fetch_assoc($result)){
      $user[] = $row;
  }  
 
  
  if(count($user) > 0){
    $userID = $user[0]['userID'];
    if($user[0]['zipCode'] == null || $user[0]['zipCode'] != $zipCode){
      $sql = "update users set address = '$address', city = '$city', state = '$state', zipCode = '$zipCode' where userID = '$userID';";

      //$resultado = connectDB($sql);
      $result = $conn->query($sql);
      
    }
  } 
  
  else{
    $password = "fruta123";
    $sql = "insert into users (`name`, surname, cpf,email, pass, address, city, state, zipCode) 
    values('$username','$surname','$cpf','$email','$password','$address','$city','$state','$zipCode')";

    //$resultado = connectDB($sql);
    $result = $conn->query($sql);

    //$lastUserID = $conn->insert_id;

    $sql = "select userID, cpf, zipCode from users where email='$email'";
    //$result = connectDB($sql);
    $result = $conn->query($sql);

    $user = [];
    while($row = mysqli_fetch_assoc($result)){
        $user[] = $row;
    }
  }

  $userID = $user[0]['userID'];
  
  /**get last order */

 // $sql_last1 = "select orderID from orders where orderID=(select max(orderID) from orders);";
  //$last_id1 = connectDB($sql_last1); 

  /** order **/

  $sql_order = "insert into orders (clientID) values ($userID);";
  //$resultado = connectDB($sql_order);
  $result = $conn->query($sql);

  $lastOrderID = $conn->insert_id;
  //$sql_last2 = "select orderID from orders where orderID=(select max(orderID) from orders);" 
  //$last_id2 = connectDB($sql_last2);

  $message = "Algo deu errado.";
  
  
/* soldItems **/
   foreach($itemsSold as $itemS){
    $itemID = $itemS['id'];
    $itemPrice = $itemS['price'];
    $itemQuantity = $itemS['quantity'];
      
    $sql_soldItems = "insert into soldItems (productID, valueItem, quantity, orderID) values ($itemID,$itemPrice,$itemQuantity, $lastOrderID)";
    //$resultado = connectDB($sql_soldItems);
    $result = $conn->query($sql);

    if($result){
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
  mysqli_close($conn);
//echo $message;
echo json_encode($message);
?>