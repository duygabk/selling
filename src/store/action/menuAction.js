import { LOAD_MENU, UPDATE_MENU } from '../constants';
import { apiGetMenu, apiUpdateMenuToServer } from '../../utils/axios';

export const loadMenuAction = () => async(dispatch) => {
  let menu = [];
  // call api
  const resultAPI = await apiGetMenu();
  if (resultAPI && resultAPI.data) {
    menu = resultAPI.data.data;
  }
  const fakeMenu = [
    {
      "Menu No.1": ["Sub Menu 1.1", "SubMenu 1.2", "SubMenu 1.3"],
    },
    {
      "Menu No.2": ["Sub Menu 2.1", "SubMenu 2.2", "SubMenu 2.3"],
    },
    {
      "Menu No.3": ["Sub Menu 3.1", "SubMenu 3.2", "SubMenu 3.3"],
    },
    {
      "Fix Menu": [],
    },
  ];

  dispatch({
    type: LOAD_MENU,
    payload: menu.length ? menu : fakeMenu,
  })
}

export const updateMenuAction = (updatedMenu) => (dispatch) => {
  dispatch({
    type: UPDATE_MENU,
    payload: updatedMenu,
  })
}
