import _ from 'lodash'

import * as types from './types';
import * as apiTypes from '../api/types';

const defaultState = {
  search: {
    query: null,
    result: null,
    state: null
  },
  categoryTree: {
    query: null,
    result: null,
    state: null,
  },
  categoryList: {
    query: null,
    result: null,
    state: null
  }
}

function deals(state = defaultState, action) {
  switch (action.type) {

    case apiTypes.API_SUCCESS:
      return handleApiSuccessAction(state, action.payload);

    case types.RESET_STATE:
      return defaultState;

    default:
      return state;
  }
}

function handleApiSuccessAction(state, payload) {
  if (!payload.label) return state;

  switch (payload.label) {

    case types.SEARCH_DEALS:
      return {
        ...state, search: {
          ...state.search,
          ...payload
        }
      };

    case types.CREATE_DEAL:
      if (payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if (Array.isArray(data)) {
          state.search.result.data = [payload.result, ...data]
          state = { ...state }
        }
      }
      return state;

    case types.UPDATE_DEAL:
      if (payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if (Array.isArray(data)) {
          const index = data.map(x => x.id).indexOf(payload.result.id);
          if (index >= 0) {
            data[index] = payload.result;
            state = { ...state }
          }
        }
      }
      return state;

    case types.DELETE_DEAL:
      if (payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if (Array.isArray(data) && data.length) {
          data = data.filter(x => x.id !== payload.result.id);
          state.search.result.data = data;
          state = { ...state }
        }
      }
      return state;

    case types.RECYCLE_DEAL:
      if (payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if (Array.isArray(data) && data.length) {
          data = data.filter(x => x.id !== payload.result.id);
          state.search.result.data = data;
          state = { ...state }
        }
      }
      return state;

    case types.VERIFY_DEAL:
      if (payload.result && payload.result.id) {
        let data = _.get(state.search, 'result.data');
        if (Array.isArray(data)) {
          const deal = data.find(x => x.id === payload.result.id);
          if (deal) {
            deal.verifiedBy = payload.result.verifiedBy;
            deal.verifiedTime = payload.result.verifiedTime;
            state = { ...state }
          }
        }
      }
      return state;

    case types.GET_CATEGORY_TREE:
      return {
        ...state,
        categoryTree: {
          ...payload
        }
      };

    case types.GET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: {
          ...payload
        }
      };

    default:
      return state;
  }
}


export default deals;