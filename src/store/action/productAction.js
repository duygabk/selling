import { ADD_PRODUCT } from '../constants';

export const addNewProduct = newProduct => {
  return {
    type: ADD_PRODUCT,
    payload: newProduct,
  }
}
