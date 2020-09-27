import * as types from './types';
import * as apiTypes from '../api/types';


const defaultState = {
  username: null,
}

function account(state = defaultState, action) {
  switch(action.type) {
    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    default:
      return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if(!payload || !payload.label) return state;

  switch(payload.label) {
    case types.LOGIN:
      return {
        ...state,
        username: payload.result.username
      };

    default:
      return state;
  }
}

export default account;