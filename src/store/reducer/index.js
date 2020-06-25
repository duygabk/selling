import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  user: userReducer,
  product: productReducer,
  menu: menuReducer,
});
