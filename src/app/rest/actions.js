import axios from 'axios';

import {
  API_LIST, SUCCESS, FAILURE, SET_DATA,
  ADD_ITEM_EPIC, SEARCH_ITEM_EPIC, EDIT_ITEM_EPIC, DELETE_ITEM_EPIC,
  ADD_ITEM_SAGA, SEARCH_ITEM_SAGA, EDIT_ITEM_SAGA, DELETE_ITEM_SAGA
} from './constants';

/**
 * @name action-creators
 */

export const success = data => ({ type: SUCCESS, data });
export const failure = error => ({ type: FAILURE, error });

export const setData = data => ({ type: SET_DATA, data });

/**
 * @name Thunk
 */

export const addItem = text =>
  dispatch =>
    axios.post(API_LIST, { text })
      .then(() => dispatch(searchItem()))
      .catch(error => dispatch(failure(error)));

export const searchItem = text =>
  dispatch =>
    axios.get(text ? `${API_LIST}?text=${text}` : API_LIST)
      .then(response => dispatch(success(response.data)))
      .then(() => dispatch(setData({ loading: false })))
      .catch(error => dispatch(failure(error)));

export const editItem = (id, text) =>
  dispatch =>
    axios.put(`${API_LIST}/${id}`, { text })
      .then(() => dispatch(searchItem()))
      .catch(error => dispatch(failure(error)));

export const deleteItem = id =>
  dispatch =>
    axios.delete(`${API_LIST}/${id}`)
      .then(() => dispatch(searchItem()))
      .catch(error => dispatch(failure(error)));

/**
 * @name Observable
 */

export const addItemObservable = text => ({ type: ADD_ITEM_EPIC, text });
export const searchItemObservable = text => ({ type: SEARCH_ITEM_EPIC, text });
export const editItemObservable = (id, text) => ({ type: EDIT_ITEM_EPIC, id, text });
export const deleteItemObservable = id => ({ type: DELETE_ITEM_EPIC, id });

/**
 * @name Saga
 */

export const addItemSaga = text => ({ type: ADD_ITEM_SAGA, text });
export const searchItemSaga = text => ({ type: SEARCH_ITEM_SAGA, text });
export const editItemSaga = (id, text) => ({ type: EDIT_ITEM_SAGA, id, text });
export const deleteItemSaga = id => ({ type: DELETE_ITEM_SAGA, id });
