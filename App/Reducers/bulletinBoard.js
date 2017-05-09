/**
 * Created by calvin.huang on 08/05/2017.
 */

import {
  FETCH_BULLETIN_BOARD,
  FETCH_BULLETIN_BOARD_SUCCESS,
  FETCH_BULLETIN_BOARD_FAILED,
  REFRESH_BULLETIN_BOARD,
  REFRESH_BULLETIN_BOARD_SUCCESS,
  REFRESH_BULLETIN_BOARD_FAILED,
} from '../Constants/actionTypes';

const initialState = {
  data: [],
  currentPage: 1,
  isRefreshing: false,
  isFetching: false,
  error: null,
};

import humps from 'humps';

export default function bulletinBoard(state = initialState, action) {
  switch (action.type) {
    case FETCH_BULLETIN_BOARD:
      return {
        ...state,
        isRefreshing: false,
        isFetching: true,
        error: null,
      };
    case FETCH_BULLETIN_BOARD_SUCCESS: {

      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      return {
        data: [ ...state.data, ...humps.camelizeKeys(data) ],
        currentPage,
        isRefreshing: false,

        // TRUE when need to fetch next page for infinity scroll.
        isFetching: hasNextPage,
        error: null,
      };
    }
    case FETCH_BULLETIN_BOARD_FAILED:
      return {
        ...state,
        currentPage: action.atPage,
        isRefreshing: false,
        isFetching: false,
        error: action.error,
      };
    case REFRESH_BULLETIN_BOARD:
      return {
        ...state,
        isRefreshing: true,
        isFetching: false,
        error: null,
      };
    case REFRESH_BULLETIN_BOARD_SUCCESS: {

      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      return {
        data: humps.camelizeKeys(data),
        currentPage,
        isRefreshing: false,

        // TRUE when need to fetch next page for infinity scroll.
        isFetching: hasNextPage,
        error: null,
      };
    }
    case REFRESH_BULLETIN_BOARD_FAILED:
      return {
        data: [],
        currentPage: 1,
        isRefreshing: false,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  };
}
