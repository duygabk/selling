import { SET_CURRENT_USER, GET_ALL_USER } from '../constants';

const userInitState = {
  users: {},
  currentUser: {
    
  }
};

const userReducer = (state = userInitState, action) => {
  switch (action.type) {

    case GET_ALL_USER:
      return {...state, users: action.payload }
      break;

    case SET_CURRENT_USER:
      return {...state, currentUser: action.payload }
      break;

    default:
      return state;
  }
}

export default userReducer;
