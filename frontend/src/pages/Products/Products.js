import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import SideMenu from "../../components/SideMenu/SideMenu";

import * as CartAction from '../../actions/cartActions';
import './Product.css';
//import Product from './Product';
const Product = lazy (() => import('./Product'))



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
        <Suspense fallback={<img src={require('../../images/suspense-prod.svg').default} alt="card produto loading"/>}>
        <section id="sectionShowcase">
          
            {currentProducts &&
              currentProducts.map(product =>             
                <Product  key={product.productID} itemsCart={props.itemsCart.itemsCart} addItem={props.addItem} product={product} />           
              )
            }
          
        </section>
        </Suspense>
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