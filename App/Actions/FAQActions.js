/**
 * Created by calvin.huang on 24/03/2017.
 */

import * as Actions from '../Constants/actionTypes';

export function fetchFAQs() {
  return {
    type: Actions.FETCH_FAQS,
  };
}

export function fetchFAQsDone(response) {
  return {
    type: Actions.FETCH_FAQS_DONE,
  };
}
