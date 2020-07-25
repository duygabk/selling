import axios from 'axios';
import { TOKEN_ITEM, BASE_URL } from '../constants';

function fetching (options) {

  const token = localStorage.getItem(TOKEN_ITEM);
  if (token) {
    return axios({...options, headers: {
      'Authorization': token,
    }})
  }

  return axios(options);
}

export function api_login_request(userInfo) {
  return fetching({
    method: "POST",
    url: `${BASE_URL}/user/login`,
    data: userInfo,
  })
}

export function apiGetUserFromToken(token) {
  return fetching({
    method: "POST",
    url: `${BASE_URL}/user/me`,
    data: {
      token: JSON.stringify(token),
    }
  })
}

export function apiUpdateMenuToServer (menu) {
  return fetching({
    method: 'POST',
    url: `${BASE_URL}/menu/update`,
    data: {
      menu: JSON.stringify(menu),
    }
  })
}

export function apiAddNewMenuToServer (menu) {
  return fetching({
    method: 'POST',
    url: `${BASE_URL}/menu/add`,
    data: {
      menu: JSON.stringify(menu),
    }
  })
}

export function apiRemoveMenuFromServer (menuId) {
  return fetching({
    method: 'DELETE',
    url: `${BASE_URL}/menu/remove/${menuId}`,
  })
}

export function apiGetMenu() {
  return fetching({
    method: 'GET',
    url: `${BASE_URL}/menu/all`,
  })
}

export function apiGetSupporter () {
  return fetching({
    method: 'GET',
    url: `${BASE_URL}/common/supporter`,
  })
}
