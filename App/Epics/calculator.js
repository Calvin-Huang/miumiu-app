/**
 * Created by calvin.huang on 24/03/2017.
 */

import { Observable } from 'rxjs';

import { CALCULATE_FEE } from '../Constants/actionTypes';
import { generalRequest, generalRequestSuccess, generalRequestFailed } from '../Actions/generalRequestActions';
import { calculateFee, calculateFeeDone } from '../Actions/calculatorActions';

import { get } from '../Utils/api';

export function calculate(action$) {
  return action$.ofType(CALCULATE_FEE)
    .switchMap((action) => {
      return new Observable(async (observer) => {
        observer.next(generalRequest());

        try {
          const response = await get(`fee?width=${action.width}&height=${action.height}&length=${action.length}&weight=${action.weight}`);
          observer.next(generalRequestSuccess());
          observer.next(calculateFeeDone(response));
        } catch (error) {
          observer.next(generalRequestFailed(error));
        }

        observer.complete();
      });
    });
}
