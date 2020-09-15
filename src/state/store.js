// configure Redux store

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from './ducks/api/reducer'
import dashboard from './ducks/dashboard/reducer'
import deals from './ducks/deals/reducer'
import stores from './ducks/stores/reducer'
import brands from './ducks/brands/reducer'
import categories from './ducks/categories/reducer'
import users from './ducks/users/reducer'

const reducers = combineReducers({
  api,
  dashboard,
  deals,
  stores,
  brands,
  categories,
  users,
});

const middleware = [thunk];

if(process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware.push(logger);
}

export default createStore(
  reducers,
  applyMiddleware(...middleware)
);



