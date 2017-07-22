/**
 * Created by calvin.huang on 08/05/2017.
 */

import humps from 'humps';

import {
  FETCH_BULLETIN_BOARD,
  FETCH_BULLETIN_BOARD_SUCCESS,
  FETCH_BULLETIN_BOARD_FAILED,
  START_BULLETIN_BOARD_SEARCH_MODE,
  STOP_BULLETIN_BOARD_SEARCH_MODE,
  SEARCH_BULLETIN_BOARD,
  REFRESH_BULLETIN_BOARD,
  REFRESH_BULLETIN_BOARD_SUCCESS,
  REFRESH_BULLETIN_BOARD_FAILED,
  FETCH_BULLETIN_SUCCESS,
} from '../Constants/actionTypes';

const initialState = {
  data: [],
  currentPage: 1,
  query: '',
  isRefreshing: false,
  isFetching: false,
  isSearching: false,
  error: null,
};

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
        ...state,
        data: [...state.data, ...humps.camelizeKeys(data)],
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
    case START_BULLETIN_BOARD_SEARCH_MODE:
      return {
        ...state,
        isSearching: true,
      };
    case STOP_BULLETIN_BOARD_SEARCH_MODE:
      return {
        ...state,
        isSearching: false,
      };
    case SEARCH_BULLETIN_BOARD: {
      const { searchMode } = action;

      return {
        data: [],
        currentPage: 1,
        query: action.query,
        isRefreshing: false,
        isFetching: true,
        isSearching: (searchMode === null || searchMode === undefined) ? state.isSearching : searchMode,
        error: null,
      };
    }
    case REFRESH_BULLETIN_BOARD_SUCCESS: {
      const { data, per_page: perPage, current_page: currentPage, total } = action.response;
      const hasNextPage = (perPage * currentPage) < total;

      return {
        ...state,
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
        ...state,
        data: [],
        currentPage: 1,
        isRefreshing: false,
        isFetching: false,
        error: action.error,
      };
    case FETCH_BULLETIN_SUCCESS: {
      const { data } = state;
      const { response } = action;

      const bulletin = data.find(eachData => eachData.id === response.id);

      data[data.indexOf(bulletin)] = { ...bulletin, ...response };

      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
}
