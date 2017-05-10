/**
 * Created by calvin.huang on 10/05/2017.
 */

import { Observable } from 'rxjs';

import * as ActionTypes from '../Constants/actionTypes';
import { updateBadges } from '../Actions/badgeActions';

import { get, del } from '../Utils/api';

export function fetchBadges(action$) {
  return action$.ofType(ActionTypes.FETCH_BADGES)
    .switchMap((_) => {
      return new Observable(async (observer) => {
        try {
          const response = await get('badges');

          observer.next(updateBadges(response));
        } catch (error) {
          // Do nothing when API failed.
        }
        observer.complete();
      });
    });
}

export function removeBadge(action$) {
  return action$.ofType(ActionTypes.REMOVE_BADGE)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        try {
          const response = await del(`badges/${action.badge}`);

          observer.next(updateBadges(response));
        } catch (error) {
          // Do nothing when API failed.
        }
        observer.complete();
      });
    });
}
