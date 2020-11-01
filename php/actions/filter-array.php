<?php 
  function filter_by_value($array, $array_key, $array_value){
    $numItems = 0;

    foreach ($array as $item){
      if ($array_value == 'todos'){
        $numItems +=1;
      }
      else{
        foreach ($item as $key => $value){
          if ($key == $array_key && $value == $array_value){
            $numItems += 1;
          }
        }
      }
    }
    return $numItems;
  } 
?>