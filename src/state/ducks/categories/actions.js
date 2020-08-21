import * as types from './types'
import { dispatchFetch } from '../api/fetch'
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
