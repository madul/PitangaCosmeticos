<?php

    require_once("connectionBD.php");

    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $cpf = $_POST['cpf'];
    $email = $_POST['email'];
    $password = $_POST['senha'];
    $password2 = $_POST['confirmSenha'];

    $success = false;
    $sql = "insert into users (`name`, surname, cpf,email, pass) 
    values(?,?,?,?,?)";

    $stmt= $conn->prepare($sql);
    $stmt->bind_param("ssiss",$name, $surname, $cpf,$email, $password);
    $stmt->execute();

    
    $errorRegister = strtoupper($stmt->error);

    if (strlen($errorRegister) != 0 ){
      if(strpos($errorRegister, "DUPLICATE") !== false && strpos($errorRegister,"EMAIL") !== false){
        $_SESSION["message-register"] = "Email já cadastrado.";
      }
      elseif(strpos($errorRegister, "DUPLICATE") !== false && strpos($errorRegister,"CPF") !== false){
        $_SESSION["message-register"] = "CPF já cadastrado.";
      }
      else{
        $_SESSION["message-register"] = $stmt->error;
      }
    }
    else{
      $_SESSION["username"] = explode(" ",$name)[0];
      $_SESSION["message-register"] = "Cadastro realizado com sucesso!\n Seja bem vinde ".$_SESSION["username"]."!";
      
      $success = true;
    }
    echo $success.'|'.$_SESSION["message-register"];  
?>