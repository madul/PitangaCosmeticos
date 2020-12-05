import  React from 'react';

import {useHistory} from 'react-router-dom';
const PortugueseCategory = {"todos": "Todos", "perfume":"Perfume", "dailycare":"Cuidados diários", "beard":"Barba", "hair":"Cabelo","makeup":"Maquiagem"}

function SMenuItem(props){
  
  const handleClick = (e) => {
    e.preventDefault();
    props.selectCategory(props.category);
  }
 
  
  return(
    <li  onClick={handleClick}>
        {PortugueseCategory[props.category]}   
    </li>
  );
}


export default function SideMenu(props){
  let history = useHistory();
  function clickToOrder(e){
    e.preventDefault();
    history.push('./buy');
  }  
  return(
    <nav id="sideMenu">
      <li id="order" className="sideMenuMainLinks" onClick={clickToOrder}>Fazer pedido</li>
      <li className="sideMenuMainLinks">Categorias</li>
      
      <ul>
        { props.categories &&
          props.categories.map( category =>
            <SMenuItem key={category} selectCategory={props.selectCategory}  category={category}/>
          )
        }
      </ul>
    </nav>
);
}