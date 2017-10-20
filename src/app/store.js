import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { counterEpic, counterReducer, watchCounter } from '~/counter';
import { crudReducer } from '~/crud';
import { restEpic, restReducer, watchRest } from '~/rest';
import { graphqlReducer } from '~/graphql';
import { formControlsReducer } from '~/form-controls';
import { dataTableReducer } from '~/data-table';
import { authorizationReducer } from '~/authorization';

import appEpic from './epics';
import appReducer from './reducer';
import watchApp from './sagas';

const rootEpic = combineEpics(
  appEpic,

  counterEpic,
  restEpic
);

const rootReducer = combineReducers({
  app: appReducer,
  router: routerReducer,
  form: formReducer,

  counter: counterReducer,
  crud: crudReducer,
  rest: restReducer,
  graphql: graphqlReducer,
  formControls: formControlsReducer,
  dataTable: dataTableReducer,
  authorization: authorizationReducer
});

const rootSaga = function *() {
  yield all([
    watchApp(),

    watchCounter(),
    watchRest()
  ]);
};

export default (history, preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      createEpicMiddleware(rootEpic),
      sagaMiddleware,
      createLogger({ diff: true })
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
