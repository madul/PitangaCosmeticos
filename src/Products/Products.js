import React from 'react';
import { useEffect, useState, useRef } from 'react';
import SideMenu from "../SideMenu/SideMenu";
import ProdModal from "../ProdModal/ProdModal";

import {ShopContext} from "../Contexts/shopContext";

import './Product.css';

function Product(props){
  const [showModal, setShowModal] = useState(false);
  const {productID, range, name, imageURL, price, currentPrice, href} = props.product;

  function addItemToList(e){
    e.preventDefault();
    props.shopList[1](props.product,"add");
  }
  return(
    <article id={productID} className="product {category}">
      <div className='imageContainer'>
        <a href={href} target="_blank">
            <img src={require(`../${imageURL}`).default} alt="Corretivo alta cobertura"/>
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
            ? <p className='old-price'>R$ {price}</p>
            : null
          }
          <p className='price'> R$ {currentPrice}</p>
        </div>
        <button className="shop-btn" name='shop' onClick={addItemToList}>
          <img src={require('../images/icon-shop-plus.png').default}/>
        </button>
      </div>
      <ProdModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        product={props.product}
      />
    </article>
  );
}

function Products(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['todos']);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(['todos']);
  const [showOrder,setShowOrder] = useState(false);
  const mounted = useRef(true);


  useEffect(() =>{
    const url = "http://pitanga/api/products.php";
    
    fetch(url)
      .then(response => response.json())
      .then( products => {
        if(mounted.current) {         
        setProducts(products);
        setCurrentProducts(products);
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
    setCurrentCategory(category);    
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
              <ShopContext.Consumer key={product.productID}>
                {(shopList) =>
                  <Product  shopList={shopList} product={product} />
                }
              </ShopContext.Consumer>
            )
          }
        </section>
      </section>
    </main>
  );
}

export default Products;