export const baseUrl = process.env.REACT_APP_API_HOST // 'https://localhost:5001/api'
export const baseIdentityUrl = process.env.REACT_APP_IDENTITY_HOST
export const basePictureUrl = process.env.REACT_APP_PICTURE_HOST

const apiRoutes = {
  dashboard: {
    base: baseUrl + '/dashboard',
  },
  deals: {
    base: baseUrl + '/deals',
  },
  stores: {
    base: baseUrl + '/stores',
  },
  brands: {
    base: baseUrl + '/brands',
  },
  categories: {
    base: baseUrl + '/categories',
    tree: baseUrl + '/categories/tree',
    list: baseUrl + '/categories/list',
  },
  users: {
    base: baseIdentityUrl + '/users',
  },
  account: {
    base: baseIdentityUrl + '/account',
    login: baseIdentityUrl + '/account/login',
    refresh: baseIdentityUrl + '/account/refresh',
  },
  pictures: {
    base: basePictureUrl + '/pictures', 
    deals: basePictureUrl + '/pictures/deals',
  },
} 

export default apiRoutes;
