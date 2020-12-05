<?php
header("Access-Control-Allow-Origin:*");
  
  require_once ('./db_connect.php');
  


  if($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    $email    = $_POST['email'];
    $pass = $_POST['password'];

    $sql = "select * from users where email='$email' and pass='$pass';";
    $resultado = connectDB($sql);
    $user = [];

    while($linha = mysqli_fetch_assoc($resultado)){
        $user[] = $linha;
    }
    
    echo json_encode($user);
}
?>