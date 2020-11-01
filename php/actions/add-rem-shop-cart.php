<?php
  session_start();

  switch($_POST['submit']) {
    case 'add':    

      

      if (isset($_SESSION['products'])){
        echo "isset add";
        $item = array_filter($_SESSION['products'], function($product){
          return $product['id'] == $_POST['id'];
        });

        if($item){
          foreach ($_SESSION['products'] as $index => $product){
            if(array_search($_POST['id'],$product)){
              $_SESSION['products'][$index]['quantity'] += 1;
            break;
            }
          } 
        }else{
          $products = array("id"=>$_POST['id'],"image" => $_POST['image'],"name" => $_POST['name'],"content" => $_POST['content'],"price" => $_POST['price'],"quantity" => 1);
            array_push($_SESSION['products'],$products);
        }
      } 
      else{
        $products = array("id"=>$_POST['id'],"image" => "../images/".$_POST['image'],"name" => $_POST['name'],"content" => $_POST['content'],"price" => $_POST['price'],"quantity" => 1);
        
        $_SESSION['products'] = array();
        array_push($_SESSION['products'],$products);
      }
      break;
    
    case 'sub':
      echo "TCHAU";
      echo $_POST['id'];

      if (isset($_SESSION['products'])){
        foreach ($_SESSION['products'] as $index => $product){
          if(array_search($_POST['id'],$product)){
            $_SESSION['products'][$index]['quantity'] -= 1;
            if($_SESSION['products'][$index]['quantity'] <= 0){
              array_splice($_SESSION['products'],$index,1);
            }
          break;
          }
        }
      }
    break;
  }
  
  print_r($_SESSION['products']);
  header("Location: http://pitanga/php/produtos.php");
  exit();
?>