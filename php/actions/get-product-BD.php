<?php

  $sql = "select productID, category, `name`, `range`, imageURL, content, price, currentPrice, description, details, href from products";
  $result = $conn->query($sql);

  $products = array();
  while($row = $result->fetch_assoc()){
      array_push($products, $row);
  } 

  // products
  foreach ($products as $parentKey =>$product){
      foreach($product as $key =>$value){
          
          //remove path of imageURL
          if ($key == 'imageURL'){
              $value = implode('',explode('images/', $value));
              $products[$parentKey][$key] = $value;
          }
      }
  }
?>