import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchCommon } from './sagas';

import shippingsReducer from './shippings/slice';

function* rootSaga(){
  yield all([fork(watchCommon)]);
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    shippings: shippingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false
    })
      .concat(sagaMiddleware);
  }
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;