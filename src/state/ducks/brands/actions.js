import * as types from './types';
import { dispatchFetch } from '../api/dispatchFetch';
import apiRoutes from '../api/apiRoutes';

export const searchBrands = data => {
  return dispatchFetch({
    url: apiRoutes.brands.base,
    label: types.SEARCH_BRANDS,
    data
  })
}

export const getBrandById = id => {
  return dispatchFetch({
    url: `${apiRoutes.brands.base}/${id}`,
    label: types.GET_BRAND_BY_ID
  })
}


export const createBrand = data => {
  return dispatchFetch({
    url: apiRoutes.brands.base,
    method: 'POST',
    label: types.CREATE_BRAND,
    data,
    toast: {
      success: 'Brand created.'
    }
  })
}

export const updateBrand = (id, data) => {
  const url = `${apiRoutes.brands.base}/${id}`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.UPDATE_BRAND,
    data,
    toast:  {
      success: 'Brand updated.'
    }
  })
}