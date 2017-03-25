/**
 * Created by calvin.huang on 24/03/2017.
 */

import * as Actions from '../Constants/actionTypes';

export function fetchFAQs() {
  return {
    type: Actions.FETCH_FAQS,
  };
}

export function fetchFAQsSuccess(response) {
  return {
    type: Actions.FETCH_FAQS_SUCCESS,
    response,
  };
}

export function fetchFAQsFailed(error) {
  return {
    type: Actions.FETCH_FAQS_FAILED,
    error,
  };
}

export function refreshFAQs() {
  return {
    type: Actions.REFRESH_FAQS,
  };
}

export function refreshFAQsSuccess(response) {
  return {
    type: Actions.REFRESH_FAQS_SUCCESS,
    response,
  };
}

export function fetchFAQ(id) {
  return {
    type: Actions.FETCH_FAQ,
    id,
  };
}

export function fetchFAQSuccess(response) {
  return {
    type: Actions.FETCH_FAQ_SUCCESS,
    response,
  };
}

export function fetchFAQFailed(error) {
  return {
    type: Actions.FETCH_FAQ_FAILED,
    error,
  };
}
