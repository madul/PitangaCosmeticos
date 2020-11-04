<?php

    session_start();
    // remove all session variables
    // deprecated? session_unset();
    unset($_SESSION["message-register"]);
    unset($_SESSION["username"]);

    // destroy the session
    session_destroy();


   header("Location: ../index.php");
   exit();
  
?>