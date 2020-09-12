import { apiFetch } from './apiFetch'
import { apiStart, apiEnd, apiSuccess } from './actions';

export const dispatchFetch = request => {

  return dispatch => {

    if (request.label)
      dispatch(apiStart(request.label));

    return apiFetch(request, true)
      .then(response => {
        const action = request.onSuccess;

        if (typeof (action) === 'object' && typeof (action.type) === 'string')
          dispatch(action);
        else if (request.label)
          dispatch(apiSuccess(request.label, response, request.data, request.state));

        return response;
      })
      .catch(error => {
        const action = request.onFailure;

        if (typeof (action) === 'object' && typeof (action.type) === 'string')
          dispatch(action);

        return Promise.reject(error);
      })
      .finally(() => {
        if (request.label) dispatch(apiEnd(request.label));
      })
  }
}
