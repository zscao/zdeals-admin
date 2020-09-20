import * as types from './types'
import { dispatchFetch } from '../api/dispatchFetch'
import apiRoutes from '../api/apiRoutes'

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

export const getCategoryById = id => {
  return dispatchFetch({
    url: `${apiRoutes.categories.base}/${id}`,
    label: types.GET_CATEGORY_BY_ID
  })
}

export const createCategory = data => {
  return dispatchFetch({
    url: apiRoutes.categories.base,
    method: 'POST',
    label: types.CREATE_CATEGORY,
    data,
    toast: {
      success: 'Category created.'
    }
  })
}

export const updateCategory = (id, data) => {
  const url = `${apiRoutes.categories.base}/${id}`;
  return dispatchFetch({
    url,
    method: 'PUT',
    label: types.UPDATE_CATEGORY,
    data,
    toast:  {
      success: 'Category updated.'
    }
  })
}