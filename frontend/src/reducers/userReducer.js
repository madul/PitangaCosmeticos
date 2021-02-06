const initialState = {
  user: {}
}

export const userReducer = (state= initialState, action) => {

  switch(action.type){
    case "SET_USER":
      return{
        user: action.user
      };
    default:
      return state;  
  }
}