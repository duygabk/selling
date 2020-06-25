import { ADD_PRODUCT } from '../constants';

const productInitState = {
  products: []
};

const productReducer = (state = productInitState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, products: [...state.products,action.payload] };
      break;
    default:
      return state;
  }
}

export default productReducer;
