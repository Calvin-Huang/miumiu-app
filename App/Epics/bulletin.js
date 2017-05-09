/**
 * Created by calvin.huang on 08/05/2017.
 */

import {
  FETCH_BULLETIN_BOARD,
  REFRESH_BULLETIN_BOARD,
  SEARCH_BULLETIN_BOARD,
} from '../Constants/actionTypes';
import {
  fetchBulletinBoard as fetchBulletinBoardAction,
  fetchBulletinBoardSuccess,
  fetchBulletinBoardFailed,
  refreshBulletinBoardSuccess,
  refreshBulletinBoardFailed,
} from '../Actions/bulletinActions';

import { get } from '../Utils/api';

export function fetchBulletinBoard(action$, store) {
  return action$.ofType(FETCH_BULLETIN_BOARD)
    .exhaustMap(async (action) => {
      try {
        const response = await get(`board?page=${action.currentPage}&q=${store.getState().bulletinBoard.query}`);

        return fetchBulletinBoardSuccess(response);
      } catch (error) {
        return fetchBulletinBoardFailed(error, action.currentPage);
      }
    });
}

export function searchBulletinBoard(action$) {
  return action$.ofType(SEARCH_BULLETIN_BOARD)
    .throttleTime(200)
    .map((_) => {
      return fetchBulletinBoardAction(1);
    });
}

export function refreshBulletinBoard(action$, store) {
  return action$.ofType(REFRESH_BULLETIN_BOARD)
    .switchMap(async (_) => {
      try {
        const response = await get(`board?page=1&q=${store.getState().bulletinBoard.query}`);

        return refreshBulletinBoardSuccess(response);
      } catch (error) {
        return refreshBulletinBoardFailed(error);
      }
    });
}
