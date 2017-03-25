/**
 * Created by calvin.huang on 24/03/2017.
 */

import { Observable } from 'rxjs';

import * as ActionTypes from '../Constants/actionTypes';
import { fetchFAQsSuccess, fetchFAQsFailed, refreshFAQsSuccess } from '../Actions/FAQActions';

import { get } from '../Utils/api';

export function fetchFAQs(action$) {
  return action$.ofType(ActionTypes.FETCH_FAQS)
    .switchMap(async (_) => {
      try {
        const response = await get('faq');

        return fetchFAQsSuccess(response);
      } catch (error) {
        return fetchFAQsFailed(error);
      }
    });
}

export function refreshFAQs(action$) {
  return action$.ofType(ActionTypes.REFRESH_FAQS)
    .switchMap(async (_) => {
      try {
        const response = await get('faq');

        return refreshFAQsSuccess(response);
      } catch (error) {
        return fetchFAQsFailed(error);
      }
    });
}
