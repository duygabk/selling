import { LOAD_MENU, UPDATE_MENU } from '../constants';

const menuInitState = {
  menu: [],
}

const menuReducer = (state = menuInitState, action) => {
  switch (action.type) {
    case LOAD_MENU:
      return { menu: action.payload }

    case UPDATE_MENU:
      return { menu: action.payload }

    default:
      return state;
  }
}

export default menuReducer;
