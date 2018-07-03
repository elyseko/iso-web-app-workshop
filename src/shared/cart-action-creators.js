import fetch, { Headers } from 'isomorphic-fetch';
import config from '../config';

export const GET_CART_ITEMS = 'GET_CART_ITEMS';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';

export function getCartItems() {
  return (dispatch) => {
    return fetch(`${config.localServer}/api/user/cart`, {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_CART_ITEMS,
          data: data.items
        });
      });
    }).catch(() => {
      return dispatch({ type: `${GET_CART_ITEMS}_ERROR` });
    });
  };
}

export function addItemToCart(item) {
  return (dispatch) => {
    return fetch(`${config.localServer}/api/user/cart/add`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      return dispatch({
        type: ADD_ITEM_TO_CART,
        item
      });
    }).catch(() => {
      return dispatch({ type: `${ADD_ITEM_TO_CART}_ERROR` });
    });
  };
}

export default {
  getCartItems,
  addItemToCart
};
