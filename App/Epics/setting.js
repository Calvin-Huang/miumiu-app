/**
 * Created by calvin.huang on 28/03/2017.
 */

import { Observable } from 'rxjs';

import * as ActionTypes from '../Constants/actionTypes';
import {
  fetchContactInfoSuccess,
  fetchContactInfoFailed,
} from '../Actions/settingActions';

import { get } from '../Utils/api';

export function fetchContactInfo(action$) {
  return action$.ofType(ActionTypes.FETCH_CONTACT_INFO)
    .switchMap(async (_) => {
      try {
        const response = await get('setting');

        return fetchContactInfoSuccess(response);
      } catch (error) {
        return fetchContactInfoFailed(error);
      }
    });
}
