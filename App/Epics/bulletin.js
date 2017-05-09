/**
 * Created by calvin.huang on 08/05/2017.
 */

import { FETCH_BULLETIN_BOARD, REFRESH_BULLETIN_BOARD } from '../Constants/actionTypes';
import {
  fetchBulletinBoardSuccess,
  fetchBulletinBoardFailed,
  refreshBulletinBoardSuccess,
  refreshBulletinBoardFailed,
} from '../Actions/bulletinActions';

import { get } from '../Utils/api';

export function fetchBulletinBoard(action$) {
  return action$.ofType(FETCH_BULLETIN_BOARD)
    .switchMap(async (action) => {
      try {
        const response = await get(`board?page=${action.currentPage}`);

        return fetchBulletinBoardSuccess(response);
      } catch (error) {
        return fetchBulletinBoardFailed(error, action.currentPage);
      }
    });
}

export function refreshBulletinBoard(action$) {
  return action$.ofType(REFRESH_BULLETIN_BOARD)
    .switchMap(async (_) => {
      try {
        const response = await get('board?page=1');

        return refreshBulletinBoardSuccess(response);
      } catch (error) {
        return refreshBulletinBoardFailed(error);
      }
    });
}
