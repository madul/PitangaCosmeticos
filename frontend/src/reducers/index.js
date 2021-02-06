import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { itemsReducer } from './itemsReducer';

export const Reducers = combineReducers({
    user: userReducer,
    itemsCart: itemsReducer
})