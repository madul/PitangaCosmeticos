import React from 'react';
import {useState, useEffect, useRef, lazy, Suspense} from 'react';
//import Container from 'react-bootstrap/Container';

import './Stores.css';

const Store = lazy(()=> import("./Store"))

function Stores(props){
  const [stores, setStores] = useState([]);
  const mounted = useRef(true);

  //console.log("store props: ",props);
  useEffect(() =>{
    const url = "http://localhost:3001/stores";
    
    fetch(url)
      .then(response => response.json())
      .then( stores => {
        if(mounted.current) {         
        setStores(stores.stores);
        }
      });

    return () => mounted.current = false;
  },[stores]);

  return(
    <main>
      <h1 className="sectionTitle">Lojas</h1>
      <Suspense fallback={<h1>Em breve sua Loja...</h1>}>
      <section id='stores'>
       
          {
            stores && stores.map(store =>
              <Store key={store.store_id} store={store}/>
            )
          }
        
      </section></Suspense>
    </main>
  );
}
export default Stores;