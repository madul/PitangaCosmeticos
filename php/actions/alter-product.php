<?php

    $_POST['imageURL'] ='images/'.$_POST['imageURL'];

    $_POST['details'] = preg_replace('~\R~','<br>',$_POST['details']);
    $_POST['description'] = preg_replace('~\R~','<br>',$_POST['description']);
    
    require_once("connectionBD.php");

    $conn->query("SET NAMES utf8");
    $sql = "update products 
            set category  = ?,
                `name`    = ?,
                `range`   = ?, 
                content   = ?,
                imageURL  = ?,
                price     = ?,
                currentPrice = ?, 
                description  = ?, 
                details   = ?,
                href      = ?
              where productID = ?";
    
    
    
    $stmt= $conn->prepare($sql);
    //print($sql);
    //print_r ($_POST);
    $stmt->bind_param("sssssiisssi", $_POST['category'], $_POST['name'], $_POST['range'], $_POST['content'],$_POST['imageURL'],$_POST['price'],$_POST['currentPrice'],$_POST['description'],$_POST['details'],$_POST['href'],$_POST['productID']);
    $stmt->execute();

    header("Location: "."http://pitanga/php/product-regist.php");
    exit();
?>