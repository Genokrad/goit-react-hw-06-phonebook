import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './users/usersSlice';
import { filterSlice } from './filter/filterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//   users: usersSlice.reducer,
//   filter: filterSlice.reducer,
// });

const persistConfig = {
  key: 'root',
  whitelist: ['users'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice.reducer);

export const store = configureStore({
  reducer: {
    users: persistedReducer,
    filter: filterSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// const persistedReducer = persistReducer(persistConfig, newReducer);

// export const store = configureStore({
//   reducer: {
//     users: persistedReducer,
//     firstReducer: usersSlice,
//     secondReducer: neUserSlice,
//   },
// });

// const newReducer = combineReducers({
//   thirdReducer: neUserSlice1,
//   forthReducer: neUserSlice2,
// })
