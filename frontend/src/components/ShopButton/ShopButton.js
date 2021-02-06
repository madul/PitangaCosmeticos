import React from'react';
import {useState, useEffect} from 'react';

import '../../index.css';
export default function ShopButton(props) {
  const [show, setShow] = useState(false);

  /* useEffect(()=>{
    setShow(props.show);
  }) */
  function handleClick(e){
    e.preventDefault();
    props.setShowList(true);
  }
  //console.log(props)
  return(
    <button id="gen-shop-button" className="shop-btn" name='shop' onClick={handleClick}>
      <img src={require('../../images/icon-shop-plus.png').default}/>
    </button>
  )
}