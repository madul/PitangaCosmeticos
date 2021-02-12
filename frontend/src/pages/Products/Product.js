import React from 'react';
import { useState, lazy, Suspense } from 'react';
import ProdModal from "../../components/ProdModal/ProdModal";


import './Product.css';

const ImgCardProd = lazy(() => import('./ImgCardProd'))

export default function Product(props){
  const [showModal, setShowModal] = useState(false);
  const {productID, range, name, imageURL, price, currentPrice, href, active} = props.product;
  let classes = "product";

  classes += active ? "" : " disabled";
  function addItemToList(e){
    e.preventDefault();
    props.addItem(props.itemsCart,{product:props.product})
  }

  return(
    <article id={productID} className={classes}>
      <div className='imageContainer'>
        <Suspense fallback={<p className="fallback-Prod-Card"> Carregando...</p>}>
          <ImgCardProd href={href} imageURL={imageURL} name={name} setShowModal={setShowModal}/>
        </Suspense>
        <div className='infoRapida' onClick={(e) => {e.preventDefault(); props.setShowModal(true)}}>
            <p>Espiadinha</p>
        </div>
      </div>
      
      <div className='prod-desc'>
        <h5 className='prod-name'>{name}</h5>
        <p className='prod-range'>{range}</p>
      </div>
      <div className="prod-footer">
        <div className='prod-price'>
          { currentPrice !== price
            ? <p className='old-price'>R$ {price.toFixed(2)}</p>
            : null
          }
          <p className='price'> R$ {currentPrice.toFixed(2)}</p>
        </div>
        <button className="shop-btn" name='shop' onClick={addItemToList} disabled={!active}>
          <img src={require('../../images/icon-shop-plus.png').default} alt="shop cart"/>
        </button>
      </div>
      <ProdModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        addItem={addItemToList}
        product={props.product}
      />
    </article>
  );
}
