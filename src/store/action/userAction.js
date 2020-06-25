import { SET_CURRENT_USER, GET_ALL_USER } from '../constants';

export const getAllUser = () => async(dispatch) => {
  // call api
  const allUser = [{},{}];
  dispatch({
    type: GET_ALL_USER,
    payload: allUser,
  })
}

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  }
}
