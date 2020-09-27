import * as types from './types';
import { dispatchFetch } from '../api/dispatchFetch';
import apiRoutes from '../api/apiRoutes';

import * as storage from '../../session/storage';

export const login = data => {
  
  return dispatchFetch({
    url: apiRoutes.account.login,
    method: 'POST',
    label: types.LOGIN,
    data, 
    onSuccess: data => {
      storage.setAuthenticationResult(data);
    }
  })
}

export const changePassword = data => {
  return dispatchFetch({
    url: `${apiRoutes.account.base}/password`,
    method: 'PUT',
    data,
    toast: {
      success: 'Your password has been changed'
    }
  })
}


export const logout = () => {
  storage.clear();
  return Promise.resolve(true)
}

