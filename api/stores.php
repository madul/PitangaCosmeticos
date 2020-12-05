<?php
  header("Access-Control-Allow-Origin:*");

  require_once ('./db_connect.php');

  if($_SERVER['REQUEST_METHOD'] === 'GET'){

    if(isset($_GET['busca'])){

        $busca = $_GET['busca'];
        
        $sql = "SELECT * FROM FILMES WHERE titulo LIKE '%$busca%';";
        $resultado = query($sql);
        $filmes = [];

        while($linha = mysqli_fetch_assoc($resultado)){
            $filmes[] = $linha;
        }

        echo json_encode($filmes);

    }
    else {

        $sql = "SELECT * FROM stores";
        $resultado = connectDB($sql);
        $stores = [];

        while($linha = mysqli_fetch_assoc($resultado)){
            $stores[] = $linha;
        }
        
        echo json_encode($stores);
    }


} else if($_SERVER['REQUEST_METHOD'] === 'POST') {

    $titulo    = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $categoria = $_POST['categoria'];

    $sql = "INSERT INTO filmes VALUES(null, '$titulo', '$descricao', '$categoria');";
    
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