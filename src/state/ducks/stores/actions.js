import * as types from './types';
import { dispatchFetch } from '../api/dispatchFetch';
import apiRoutes from '../api/apiRoutes';


export const searchStores = data => {
  return dispatchFetch({
    url: apiRoutes.stores.base,
    label: types.SEARCH_STORES,
    data,
    //onSuccess: data => ({type: types.SEARCH_STORES, payload: data}),
  })
}

export const getStoreById = id => {
  return dispatchFetch({
    url: `${apiRoutes.stores.base}/${id}`,
    label: types.GET_STORE_BY_ID
  })
}

export const createStore = data => {
  return dispatchFetch({
    url: apiRoutes.stores.base,
    method: 'POST',
    label: types.CREATE_STORE,
    data,
    toast: {
      success: 'Store created.'
    }
  })
}

export const updateStore = (id, data) => {
  const url = `${apiRoutes.stores.base}/${id}`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.UPDATE_STORE,
    data,
    toast:  {
      success: 'Store updated.'
    }
  })
}