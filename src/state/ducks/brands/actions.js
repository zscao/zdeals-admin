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