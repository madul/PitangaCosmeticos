import React from 'react';

export const ShopContext = React.createContext({
  shopList: [],
  alterItemsList: () => {},
  eraseList: () =>{}
});