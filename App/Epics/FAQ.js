/**
 * Created by calvin.huang on 24/03/2017.
 */

import { Observable } from 'rxjs';

import * as ActionTypes from '../Constants/actionTypes';
import { fetchFAQs, fetchFAQsDone } from '../Actions/FAQActions';
import { generalRequest, generalRequestSuccess, generalRequestFailed } from '../Actions/generalRequestActions';

import { get } from '../Utils/api';

export function fetchFAQs(action$) {
  return action$.ofType(ActionTypes.FETCH_FAQS)
    .switchMap((_) => {
      return new Object(async (observer) => {
        observer.next(generalRequest());

        try {
          const response = await get('faq');
          observer.next(fetchFAQsDone(response));

          observer.next(generalRequestSuccess());
        } catch (error) {
          observer(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}
