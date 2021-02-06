import React from 'react';
import {useState, useEffect, useRef} from 'react';
//import Container from 'react-bootstrap/Container';

import './Stores.css';

function Store(props){
  return(
    <div className='store'>
      <h3>{props.store.store_name? props.store.store_name : props.store.city}</h3>
      <p>{props.store.logradouro}, {props.store.store_number}</p>
      {
        props.store.complement? <p>{props.store.complement}</p> : null
      }
      <p>{props.store.nbh}</p>
      <p>({props.store.phone.toString().slice(0,2)}) {props.store.phone.toString().slice(2,6)}-{props.store.phone.toString().slice(6)}</p>
    </div>
  );
}

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
      
      <section id='stores'>
        {
          stores && stores.map(store =>
            <Store key={store.store_id} store={store}/>
          )
        }
      </section>
    </main>
  );
}
export default Stores;