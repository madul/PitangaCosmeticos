import React from 'react';

export const UserContext = React.createContext({
  user: [{
    userID:0,
    name:'',
    surname:"",
    email:'',
    pass:'',
    dob:'',
    cpf:0,
    mobile:0,
    address:'',
    addressNumber:0,
    addressCompl:'',
    city:'',
    state:'',
    zipCode:0,

  }],
  setUser: () => {}
});