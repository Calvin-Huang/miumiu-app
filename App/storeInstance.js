/**
 * Created by Calvin Huang on 2/24/17.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './Reducers';
import rootEpics from './Epics';

const epicMiddleware = createEpicMiddleware(rootEpics);

export default store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      epicMiddleware,
    )
  )
);
