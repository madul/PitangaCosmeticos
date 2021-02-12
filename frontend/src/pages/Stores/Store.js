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

export default Store;