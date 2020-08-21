import * as types from './types'
import * as apiTypes from '../api/types'

const defaultState = {
  tree: {
    query: null,
    result: null,
    state: null,
  }
}

function categories(state = defaultState, action) {
  switch (action.type) {

    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    default: 
      return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if(!payload || !payload.label) return state;

  switch(payload.label) {
    case types.GET_CATEGORY_TREE:
      return {
        ...state, tree: {
          ...payload
        } 
      };

    default:
      return state;
  }
}

export default categories