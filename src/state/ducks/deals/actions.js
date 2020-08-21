import * as types from './types';
import { dispatchFetch } from '../api/fetch';
import apiRoutes from '../api/apiRoutes';

export const searchDeals = (data, state) => {
  return dispatchFetch({
    url: apiRoutes.deals.base,
    label: types.SEARCH_DEALS,
    data,
    state
  });
}

export const resetState = () => {
  return {
    type: types.RESET_STATE
  }
}

export const getDealById = id => {
  return dispatchFetch({
    url: `${apiRoutes.deals.base}/${id}`,
    label: types.GET_DEAL_BY_ID,
    //onSuccess: data => { console.log('data: ', data)}
    //onFailure: error => { console.log('error: ', error)}
  });
}

export const createDeal = data => {
  return dispatchFetch({
    url: apiRoutes.deals.base,
    method: 'POST',
    label: types.CREATE_DEAL,
    data,
    toast: {
      success: 'Deal created.'
    },
  })
}

export const updateDeal = (id, data) => {
  const url = `${apiRoutes.deals.base}/${id}`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.EDIT_DEAL,
    data,
    toast: {
      success: 'Deal updated.'
    },
  })
} 

export const deleteDeal = id => {
  const url = `${apiRoutes.deals.base}/${id}`;
  return dispatchFetch({
    url,
    method: 'DELETE',
    label: types.DELETE_DEAL,
    toast: {
      success: 'Deal deleted.'
    }
  })
}

export const recycleDeal = id => {
  const url = `${apiRoutes.deals.base}/${id}/recycle`;
  return dispatchFetch({
    url,
    method: 'POST',
    label: types.RECYCLE_DEAL,
    toast: {
      success: 'Deal recycled.'
    }
  })
}

export const verifyDeal = id => {
  const url = `${apiRoutes.deals.base}/${id}/verify`;
  return dispatchFetch({
    url,
    method: 'POST',
    label: types.VERIFY_DEAL,
    toast: {
      success: 'Deal verified.'
    }
  })
}

export const getDealPictures = dealId => {
  const url = `${apiRoutes.deals.base}/${dealId}/pictures`;
  return dispatchFetch({
    url,
    label: types.GET_DEAL_PICTURES
  })
}

export const saveDealPicture = (dealId, data) => {
  const url = `${apiRoutes.deals.base}/${dealId}/pictures`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.SAVE_DEAL_PICTURE,
    data,
    toast: {
      success: 'Picture saved'
    }
  })
}

export const getDealCategories = dealId => {
  const url = `${apiRoutes.deals.base}/${dealId}/categories`;
  return dispatchFetch({
    url,
    label: types.GET_DEAL_CATEGORIES
  })
}

export const saveDealCategories = (dealId, data) => {
  const url = `${apiRoutes.deals.base}/${dealId}/categories`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.SAVE_DEAL_CATEGORIES,
    data,
    toast: {
      success: 'Categories saved'
    }
  })
}

export const getCategoryTree = () => {
  return dispatchFetch({
    url: apiRoutes.categories.tree,
    label: types.GET_CATEGORY_TREE,
  })
}

export const getCategoryList = () => {
  return dispatchFetch({
    url: apiRoutes.categories.list,
    label: types.GET_CATEGORY_LIST,
  })
}