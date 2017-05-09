/**
 * Created by calvin.huang on 08/05/2017.
 */

import * as actionTypes from '../Constants/actionTypes';

export function fetchBulletinBoard(currentPage = 1) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD,
    currentPage,
  }
}

export function fetchBulletinBoardSuccess(response) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD_SUCCESS,
    response,
  }
}

export function fetchBulletinBoardFailed(error, atPage) {
  return {
    type: actionTypes.FETCH_BULLETIN_BOARD_FAILED,
    error,
    atPage,
  }
}

export function refreshBulletinBoard() {
  return {
    type: actionTypes.REFRESH_BULLETIN_BOARD,
  }
}

export function refreshBulletinBoardSuccess(response) {
  return {
    type: actionTypes.REFRESH_BULLETIN_BOARD_SUCCESS,
    response,
  }
}

export function refreshBulletinBoardFailed(error) {
  return {
    error,
  }
}
