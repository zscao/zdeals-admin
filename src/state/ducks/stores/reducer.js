import * as types from './types';
import * as apiTypes from '../api/types';

import _ from 'lodash'

const defaultState = {
  search: {
    query: null,
    result: null,
    state: null
  }
}

function stores(state = defaultState, action) {
  switch (action.type) {

    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    default:
      return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if (!payload || !payload.label) return state;

  switch (payload.label) {
    case types.SEARCH_STORES:
      return {
        ...state, search: {
          ...payload
        }
      };
      
    case types.CREATE_STORE:
      if(payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if(Array.isArray(data)) {
          state.search.result.data = [...data, payload.result];
          state.search.result =  { ...state.search.result}
        }
      }
      return state;

    default:
      return state;
  }
}

export default stores;