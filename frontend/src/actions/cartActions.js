const indexAndList = (state, item) => {
  let indexItem = state.map((itemList, index) =>  
      itemList.product.productID == item.product.productID? index:-1).find((value)=>value >= 0);
  
  let listCopy = [...state];

  return [indexItem,  listCopy]

}

export const addItem = (state,item) => {
  
  let [indexItem, listCopy] = indexAndList(state,item)

  if(indexItem >=0){
   listCopy[indexItem]["quantity"] +=1;

    return{
      type: "ADD_ITEM",
      items: listCopy
    }
  } else{
    if(listCopy[0].quantity == 0){
      listCopy[0].quantity = 1;
      listCopy[0].product = item.product   
    }
    else {
    listCopy.push({quantity: 1, product:item.product})
    }
    return{
      type: "ADD_ITEM",
      items: listCopy
    }
  }
}

export const removeItem = (state,item) => {
  let [indexItem, listCopy] = indexAndList(state,item)
  
  if(listCopy[indexItem]["quantity"] > 0){
    listCopy[indexItem]["quantity"] -=1;

    if(listCopy[indexItem]["quantity"] == 0){
      let listAux = deleteItem(state, item).items

      listCopy = listAux.length > 0 ? listAux : [{quantity:0, product:{}}]
  
    } 
    return {
      type: "REMOVE_ITEM",
      items: listCopy
    }
  }     
  return {
    type: "REMOVE_ITEM",
    items: state
  }
}

export const deleteItem = (state,item) => {
  let [indexItem, listCopy] = indexAndList(state,item)

  if (indexItem >=0) {
    listCopy.splice(indexItem,1)
    
    listCopy = listCopy.length > 0 ? listCopy : [{quantity:0, product:{}}]
    
    return {
      type: "DELETE_ITEM",
      items: listCopy
    }
  }
  
  return {
    type: "DELETE_ITEM",
    items: state
  }
}

export const alterQItem = (state, item,newQtd) => {
  let [indexItem, listCopy] = indexAndList(state,item)

    if (indexItem >=0) {
      listCopy[indexItem]["quantity"] = newQtd;
      return {
        type: "ALTER_Q_ITEM",
        items: listCopy
      }
    }
    return {
      type: "DELETE_ITEM",
      items: state
    }
}
export const discardCart = () =>{
  return {
    type: "DISCARD_CART"
  }
}