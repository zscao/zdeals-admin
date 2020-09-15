import * as types from './types';
import { dispatchFetch } from '../api/dispatchFetch';
import apiRoutes from '../api/apiRoutes';

export const getDealsDailyVisit = data => {
  return dispatchFetch({
    url: `${apiRoutes.dashboard.base}/dailyvisit`,
    label: types.GET_DEALS_DAILY_VISIT,
    data
  })
}