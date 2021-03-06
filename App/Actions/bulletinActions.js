/**
 * Created by calvin.huang on 08/05/2017.
 */

import * as actionTypes from '../Constants/actionTypes';

export function fetchBulletinBoard(currentPage = 1) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD,
    currentPage,
  };
}

export function fetchBulletinBoardSuccess(response) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD_SUCCESS,
    response,
  };
}

export function fetchBulletinBoardFailed(error, atPage) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD_FAILED,
    error,
    atPage,
  };
}

export function startBulletinBoardSearchMode() {
  return {
    type: actionTypes.START_BULLETIN_BOARD_SEARCH_MODE,
  };
}

export function stopBulletinBoardSearchMode() {
  return {
    type: actionTypes.STOP_BULLETIN_BOARD_SEARCH_MODE,
  };
}

export function setBulletinBoardSearchMode(isSearching) {
  return {
    type: isSearching ? actionTypes.START_BULLETIN_BOARD_SEARCH_MODE : actionTypes.STOP_BULLETIN_BOARD_SEARCH_MODE,
  };
}

export function searchBulletinBoard({ query = '', searchMode } = {}) {
  return {
    type: actionTypes.SEARCH_BULLETIN_BOARD,
    query,
    searchMode,
  };
}

export function refreshBulletinBoard() {
  return {
    type: actionTypes.REFRESH_BULLETIN_BOARD,
  };
}

export function refreshBulletinBoardSuccess(response) {
  return {
    type: actionTypes.REFRESH_BULLETIN_BOARD_SUCCESS,
    response,
  };
}

export function refreshBulletinBoardFailed(error) {
  return {
    type: actionTypes.REFRESH_WAYBILLS_FAILED,
    error,
  };
}

export function fetchBulletin(id) {
  return {
    type: actionTypes.FETCH_BULLETIN,
    id,
  };
}

export function fetchBulletinSuccess(response) {
  return {
    type: actionTypes.FETCH_BULLETIN_SUCCESS,
    response,
  };
}

export function fetchBulletinFailed(error) {
  return {
    type: actionTypes.FETCH_BULLETIN_FAILED,
    error,
  };
}
