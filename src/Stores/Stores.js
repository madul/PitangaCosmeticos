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
      <p>({props.store.ddd}) {props.store.phone.slice(0,4)}-{props.store.phone.slice(4)}</p>
    </div>
  );
}

function Stores(props){
  const [stores, setStores] = useState([]);
  const mounted = useRef(true);

  console.log("store props: ",props);
  useEffect(() =>{
    const url = "http://pitanga/api/stores.php";
    
    fetch(url)
      .then(response => response.json())
      .then( stores => {
        if(mounted.current) {         
        setStores(stores);
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