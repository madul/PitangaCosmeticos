<?php
  header("Access-Control-Allow-Origin:*");
  
  require_once ('./db_connect.php');
  


  if($_SERVER['REQUEST_METHOD'] === 'GET'){

        $sql = "SELECT * FROM products";
        $resultado = connectDB($sql);
        $products = [];

        while($linha = mysqli_fetch_assoc($resultado)){
            $products[] = $linha;
        }
        
        echo json_encode($products);


} else if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $name    = $_POST['name'];
    $surname = $_POST['surname'];
    $cpf = (int)$_POST['cpf'];

    $sql = "insert into teste values ('$name', '$surname', $cpf);";
    
    nonquery($sql);

    echo json_encode(array("msg" => "Método POST Efetuado")); 
    

} else if($_SERVER['REQUEST_METHOD'] === 'PUT'){

    echo json_encode(array("msg" => "Método PUT Efetuado"));

} else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

    echo json_encode(array("msg" => "Método DELETE Efetuado"));

} else {

    echo "Falha no processamento dos dados. Método inválido.";

}

  
?>