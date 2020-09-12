import React from 'react'

import axios from 'axios';
import { toast as toastify } from 'react-toastify';

import apiRoutes, { baseUrl } from './apiRoutes';
import * as storage from '../../session/storage';

export const apiFetch = request => {
  let {
    url = '',
    method = 'GET',
    data = null,
    headers = null,
    toast = null,
    onUploadProgress = null,
  } = request;

  const token = storage.getToken();
  //console.log('token: ', token, user);
  if (token) {
    if (!headers) headers = {};
    headers.Authorization = "Bearer " + token
  }

  const dataOrParams = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data';
  axios.defaults.baseURL = baseUrl;

  return axios.request({ url, method, headers, [dataOrParams]: data, onUploadProgress })
    .then(response => {

      if (typeof (request.onSuccess) === 'function')
        request.onSuccess = request.onSuccess(response.data);

      if (toast && toast.success)
        toastify.success(toast.success);

      return response.data;
    })
    .catch(e => {
      let handled = false;

      if (e.response.status === 401 && e.response.headers['token-expired'] === 'true') {
        const token = storage.getToken();
        const refToken = storage.getRefreshToken();

        if(token && refToken) {
          handled = true;
          // clear current token to avoid infinite loop
          storage.clear();

          return refreshToken(token, refToken)
            .then(() => apiFetch(request))
            .catch(e1 => {
              const error = handleError(e1, request);
              return Promise.reject(error);
            })
        }
      }
      if(!handled) {
        const error = handleError(e, request);
        return Promise.reject(error);
      }
    })
}

const handleError = (e, request) => {
  const error = getErrors(e);

  if (typeof (request.onFailure) === 'function')
    request.onFailure = request.onFailure(error);

  if (!request.toast || !request.toast.failure) {
    toastify.error(formatToastErrors(error), { autoClose: false })
  }

  return error;
}

const getErrors = e => {
  const data = e && e.response && e.response.data;
  if (data && data.status && data.message) { // API error
    return data;
  }

  if (e.isAxiosError) {
    e = e.toJSON();
    return { status: e.code || 400, message: e.message }
  }
  else {
    return { status: 400, message: e }
  }
}

const formatToastErrors = error => {
  console.log('error:', error);
  return (
    <div>
      <div>[{error.status}] {error.message}</div>
      {Array.isArray(error.errors) && error.errors.map((e, index) => <div key={index}>- {e.code}: {e.message}</div>)}
    </div>
  )
}

const refreshToken = (token, refreshToken) => {
  const data = {
    token,
    refreshToken
  };

  return apiFetch({
    url: apiRoutes.users.refresh,
    method: 'POST',
    data,
    onSuccess: data => {
      storage.setAuthenticationResult(data);
    }
  })
}