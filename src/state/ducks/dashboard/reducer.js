import * as types from './types';
import * as apiTypes from '../api/types';

import _ from 'lodash'

const defaultState = {
  dealsDailyVisit: {}
}

function brands(state = defaultState, action) {
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
    case types.GET_DEALS_DAILY_VISIT:
      return {
        ...state, 
        dealsDailyVisit: payload
      };

    default:
      return state;
  }
}

export default brands;