/**
 * Created by calvin.huang on 24/03/2017.
 */

import {
  FETCH_FAQS,
  FETCH_FAQS_SUCCESS,
  FETCH_FAQS_FAILED,
  REFRESH_FAQS,
  REFRESH_FAQS_SUCCESS,
  FETCH_FAQ_SUCCESS,
} from '../Constants/actionTypes';

const initialState = {
  isFetching: false,
  isRefreshing: false,
  data: [],
  error: null,
};

export default function FAQs(state = initialState, action) {
  switch (action.type) {
    case FETCH_FAQS:
      return {
        isFetching: true,
        isRefreshing: false,
        data: [],
        error: null,
      };
    case FETCH_FAQS_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_FAQS_FAILED:
      return {
        isFetching: false,
        isRefreshing: false,
        data: [],
        error: action.error,
      };
    case REFRESH_FAQS:
      return {
        ...state,
        isFetching: false,
        isRefreshing: true,
        error: null,
      };
    case REFRESH_FAQS_SUCCESS:
      return {
        isFetching: false,
        isRefreshing: false,
        data: action.response,
        error: null,
      };
    case FETCH_FAQ_SUCCESS:
      const { data } = state;
      const { response } = action;

      const faq = data.find((eachData) => eachData.id === response.id);

      data[data.indexOf(faq)] = { ...faq, ...response };

      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
