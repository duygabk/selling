import { LOAD_SUPPORTER, SET_PRODUCT_FILTER } from '../constants';
import { apiGetSupporter } from '../../utils/axios';

export const loadSupporter = () => async(dispatch) => {
  // call api
  const supporter = await apiGetSupporter();

  // dispatch to store
  dispatch ({
    type: LOAD_SUPPORTER,
    payload: supporter,
  })
}

export const setSelectedMenu = (currMenu) => {
  return {
    type: SET_PRODUCT_FILTER,
    payload: currMenu,
  }
}
