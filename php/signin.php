<?php
  require_once("./actions/connectionBD.php");

  print_r ($_POST);
  if(isset($_POST["signin"])){
    $email = $_POST["email"];
    $pass = $_POST["password"];

    if(strlen($email) > 0 && strlen($pass) > 0){
      $sql = "SELECT * FROM users WHERE email = '$email' AND pass = '$pass'";
      $resultado = mysqli_query($conn, $sql);

      while($row = mysqli_fetch_assoc($resultado)){
        if ($row['userID']){
            $_SESSION['id'] = $row['userID'];
            $_SESSION['username'] = $row['name'];
            $_SESSION['email'] = $row['email'];

            header("Location: ../index.php");
        }
      }
    }
  }

?>