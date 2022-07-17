import { configureStore } from '@reduxjs/toolkit';

import shippingsReducer from './shippings/slice';

export const store = configureStore({
  reducer: {
    shippings: shippingsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;