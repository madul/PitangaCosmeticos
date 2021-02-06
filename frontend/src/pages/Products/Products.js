import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState, useRef } from 'react';
import SideMenu from "../../components/SideMenu/SideMenu";
import ProdModal from "../../components/ProdModal/ProdModal";

import * as CartAction from '../../actions/cartActions';

import './Product.css';

function Product(props){
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
        <a href={href} target="_blank">
            <img src={require(`../../${imageURL}`).default} alt={name}/>
        </a>
        <div className='infoRapida' onClick={(e) => {e.preventDefault(); setShowModal(true)}}>
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

function Products(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['todos']);
  const [currentProducts, setCurrentProducts] = useState([]);
  const mounted = useRef(true);


  useEffect(() =>{
    const url = 'http://localhost:3001/products';
    fetch(url)
      .then(response => response.json())
      .then( products => {
        if(mounted.current) {         
        setProducts(products.products);
        setCurrentProducts(products.products);
        }
      });

    return () => mounted.current = false;
  },[products]);

  useEffect(() => {
    async function Categories(){

      if (products){
        await products.forEach(product => {
          if (categories.indexOf(product["category"]) === -1){
            setCategories([...categories,product["category"]]);
          }
        });  
      }
    }
    Categories()
  })

  const selectCategory = (category) =>{
    
    if (category === 'todos'){
      setCurrentProducts(products);
    } else if (category === 'perfume'){
      setCurrentProducts(products.filter(product => product["category"] === category));
    } else if (category === 'dailycare'){
      setCurrentProducts(products.filter(product => product["category"] === category));
    } else if (category === 'beard'){
      setCurrentProducts(products.filter(product => product["category"] === category));
    } else if (category === 'hair'){
      setCurrentProducts(products.filter(product => product["category"] === category));
    } else if (category === 'makeup'){
      setCurrentProducts(products.filter(product => product["category"] === category));
    }    
  }
  return (
    <main>
      <h1 className="sectionTitle"> Products</h1>
      <section id="prodBody">
        <section id="sectionSideMenu">
          <SideMenu  categories={categories} selectCategory={selectCategory} />
        </section>
        <section id="sectionShowcase">
          {currentProducts && 
            currentProducts.map(product =>
              <Product  key={product.productID} itemsCart={props.itemsCart.itemsCart} addItem={props.addItem} product={product} />
            )
          }
        </section>
      </section>
    </main>
  );
}

const mapStateToProps = state =>({
  itemsCart: state.itemsCart
})
const mapDispatchToProps = (dispatch) => 
      bindActionCreators(CartAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products)