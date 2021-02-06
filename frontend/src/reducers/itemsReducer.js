const initialState = {
  itemsCart: [{
    quantity: 0,
    product:{}
  }]
}

export const itemsReducer = (state = initialState, action ) =>{
  switch(action.type){
    case "ADD_ITEM":
      return{
        itemsCart: [...action.items]
      };
    case "REMOVE_ITEM":
      console.log("REMOVE_ITEM_ACTION: ", action.items)
      return{
        itemsCart: [...action.items]
      };
    case "DELETE_ITEM":
      return{
        itemsCart: [...action.items]
      };
    case "DISCARD_CART":
      return{
        itemsCart: [{
          quantity: 0,
          product:{}
        }]
      };
    case "ALTER_Q_ITEM":
      return{
        itemsCart: [...action.items]
      };
    default:
      return state;  
  }
}