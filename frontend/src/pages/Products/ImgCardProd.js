import React from 'react'
export default function ImgCardProd (props){

  return(
        <a href={props.href} target="_blank">
            <img src={require(`../../${props.imageURL}`).default} alt={props.name}/>
        </a>
  )
}