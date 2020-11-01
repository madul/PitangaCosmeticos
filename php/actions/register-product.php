<?php
    $_POST['imageURL'] ='images/'.$_POST['imageURL'];

    $_POST['details'] = preg_replace('~\R~','<br>',$_POST['details']);
    $_POST['description'] = preg_replace('~\R~','<br>',$_POST['description']);
    
    require_once("connectionBD.php");
    
    $conn->query("SET NAMES utf8");
    $sql = "insert into pitangacos.products (category,`name`,`range`, content, imageURL, price,currentPrice, description, details, href)
            values  (?,?,?,?,?,?,?,?,?,?)";
    
    $stmt= $conn->prepare($sql);
    $stmt->bind_param("sssssiisss", $_POST['category'], $_POST['name'], $_POST['range'], $_POST['content'],'.//'.$_POST['imageURL'],$_POST['price'],$_POST['price'],$_POST['description'],$_POST['details'],$_POST['href']);
    $stmt->execute();

    header("Location: "."http://pitanga/php/product-regist.php");
    exit();
?>