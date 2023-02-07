import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './users/usersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice);

export const store = configureStore({
  reducer: {
    users: persistedReducer,
  },
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
